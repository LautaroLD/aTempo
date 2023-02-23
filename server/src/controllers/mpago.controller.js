const { generatePaymentLink, getPaymentStatus } = require('../services/mpago.services');
const { User, Order } = require("../database/models");
const createCheckout = async (req, res) => {
  try {

    if (!req.query.email) {
      throw new Error("Please provide an user email")
    }

    const email = req.query.email;
    const orderId = Number(req.query.orderId);

    const customer = await User.findOne({
      where: { email },
    });

    if (customer === null) {
      throw new Error(`E-mail ${email} not found in database`)
    }

    const orderToPay = await Order.findOne({
      where: { id: orderId },
    });

    if (orderToPay === null) {
      throw new Error(`Order ${orderId} not found in database`)
    }

    const items = [{
      id: orderId,
      currency_id: "ARS",
      title: "A Tempo order",
      description: "A Tempo items",
      quantity: 1,
      unit_price: orderToPay.dataValues.totalPrice,
    }];

    const payer = {
      userId: customer.dataValues.id || "c61c99a3-611c-427e-bf4e-0843d131379d",
      name: customer.dataValues.firstName,
      surname: customer.dataValues.firstName,
      email: customer.dataValues.email,
    }

    const external_reference = orderId.toString();

    let link = await generatePaymentLink(items, payer, external_reference, req);
    res.status(201).json({ "link": link?.body.init_point })

  } catch (error) {
    res.status(400).json(({ message: error.message }))
  }
};

const handlePayment = async (req, res) => {
  const { payment_id, status, external_reference } = req.query;

  const orderId = Number(external_reference);

  console.log(payment_id, status, orderId);

  try {

    const orderUpdate = await Order.update(
      { status: status, paymentId: payment_id },
      { where: { id: orderId } }
    );

    res.status(200).json(({ message: `Payment ${payment_id} was ${status}` }))

  } catch (error) {
    res.status(500).json({ "error": error.message })
  }
};

module.exports = {
  createCheckout,
  handlePayment,
};
