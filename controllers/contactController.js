const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// Get all contacts API
// Route: GET /api/contacts
// Access: Private
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id });
    res.status(200).json(contacts);
});

// Create contact API
// Route: POST /api/contacts
// Access: Private
const createContact = asyncHandler(async (req, res) => {
    console.log("the request body is:", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400).json({ error: "All fields are required" });
        return;
    }

    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id,
    });
    // Send response with status code 201 and the created contact in it
    res.status(201).json(contact);
});


    // res.status(201).json(contact);
// });

// Get contact by ID API
// Route: GET /api/contacts/:id
// Access: Private
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error('Contact not found');
    }
    res.status(200).json(contact);
});

// Update contact by ID API
// Route: PUT /api/contacts/:id
// Access: Public
const updateContact = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        res.status(400).json({ error: "No update data provided" });
        return;
    }

    let contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!contact) {
        return res.status(404).json({ message: "No contact with this id was found." });
    }
    res.status(200).json({ message: `Contact updated for id ${req.params.id}` });
});

// Delete contact by ID API
// Route: DELETE /api/contacts/:id
// Access: Private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    await contact.deleteOne(); // Use deleteOne or deleteMany based on your requirements
    res.status(200).json({ message: `Contact deleted with id ${req.params.id}` });
});

module.exports = {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact
};
