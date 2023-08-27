const express = require('express');
const router = express.Router();

const reservationController = require('../controllers/reservationController.js');
const authController = require('../controllers/authController.js');

router
  .route('/')
  .get(reservationController.getAllReservation)
  .post(authController.protect, reservationController.createReservation);

router
  .route('/brand-sales')
  .get(authController.protect, reservationController.getBrandSales)

router
  .route('/:id')
  .get(reservationController.getReservation)
  .patch(reservationController.updateReservation)
  .delete(reservationController.deleteReservation);

module.exports = router;
