const User = require('../models/user');

async function createDefaultUser() {
  const username = 'admin';
  const password = 'password123'; 
  const role = 1;

  try {
    const user = await User.create({ username, password});
    console.log(`Default user created: ${User.username}`);
  } catch (error) {
    console.error('Error creating default user:', error);
  }
}

createDefaultUser();