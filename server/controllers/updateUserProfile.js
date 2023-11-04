exports.updateUserProfile = async (req, res) => {
    try {
      const { userId } = req.params; // Extract the user's ID from the request parameters
      const updatedData = req.body; // Extract updated user data from the request body
  
      // Update user data in the database
      await User.findByIdAndUpdate(userId, updatedData);
  
      // Respond with a success message
      res.json({ message: 'User profile updated successfully' });
    } catch (error) {
      // Handle errors, e.g., user not found or database connection issues
      res.status(404).json({ error: 'User not found' });
    }
  };