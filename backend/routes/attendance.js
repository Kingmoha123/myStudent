import express from "express"
import { roleMiddleware } from "../middleware/auth.js"
import Attendance from "../models/Attendance.js"

const router = express.Router()

router.post("/", roleMiddleware(["teacher"]), async (req, res) => {
  try {
    const { studentId, classId, date, status, remarks } = req.body

    // Attempt to update existing or create new (upsert)
    const attendance = await Attendance.findOneAndUpdate(
      { studentId, classId, date: new Date(date) },
      { status, remarks },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    ).populate({
      path: "studentId",
      populate: { path: "userId", select: "firstName lastName" },
    })

    res.status(201).json(attendance)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post("/bulk", roleMiddleware(["teacher"]), async (req, res) => {
  try {
    const { items } = req.body // Array of { studentId, classId, date, status }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "No attendance items provided" })
    }

    const operations = items.map((item) => ({
      updateOne: {
        filter: {
          studentId: new mongoose.Types.ObjectId(item.studentId),
          classId: new mongoose.Types.ObjectId(item.classId),
          date: new Date(item.date)
        },
        update: { status: item.status },
        upsert: true,
      },
    }))

    await Attendance.bulkWrite(operations)
    res.status(201).json({ message: "Attendance saved successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get("/", async (req, res) => {
  try {
    const attendance = await Attendance.find()
      .populate({
        path: "studentId",
        populate: { path: "userId", select: "firstName lastName" },
      })
      .populate("classId", "name")
      .sort({ createdAt: -1 })
    res.json(attendance)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get("/class/:classId", async (req, res) => {
  try {
    const attendance = await Attendance.find({ classId: req.params.classId }).populate({
      path: "studentId",
      populate: { path: "userId", select: "firstName lastName" },
    })
    res.json(attendance)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get("/student/:studentId", async (req, res) => {
  try {
    const attendance = await Attendance.find({ studentId: new mongoose.Types.ObjectId(req.params.studentId) }).populate("classId", "name")
    res.json(attendance)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get attendance stats for a student
router.get("/stats/student/:studentId", async (req, res) => {
  try {
    const sId = new mongoose.Types.ObjectId(req.params.studentId)
    const total = await Attendance.countDocuments({ studentId: sId })
    const present = await Attendance.countDocuments({
      studentId: sId,
      status: { $in: ["present", "late"] }
    })

    const percentage = total === 0 ? 0 : Math.round((present / total) * 100)

    res.json({
      total,
      present,
      percentage
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.put("/:id", roleMiddleware(["teacher"]), async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(attendance)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
