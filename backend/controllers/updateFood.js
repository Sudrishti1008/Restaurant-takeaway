export const updateFood = async (req, res) => {
    try {
      const updated = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(updated);
    } catch (err) {
      res.status(500).json({ message: 'Update failed', error: err.message });
    }
  };
  