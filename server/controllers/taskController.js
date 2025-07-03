import Task from '../models/Task.js';

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createTask = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: 'Text is required' });
    const task = new Task({ text });
    const saved = await task.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const toggleTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    task.completed = !task.completed;
    const updated = await task.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
