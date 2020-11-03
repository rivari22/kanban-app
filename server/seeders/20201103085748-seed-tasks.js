'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const data = [
    {
     title: "Bekerja",
     CategoryId: 1,
     createdAt: new Date(),
     updatedAt: new Date(),
    },
    {
      title: "Bermain Apex",
      CategoryId: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "coding",
      CategoryId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Group Project",
      CategoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Sudoku",
      CategoryId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    ]
    await queryInterface.bulkInsert("Tasks", data)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * 
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Tasks', null, {});
  }
};
