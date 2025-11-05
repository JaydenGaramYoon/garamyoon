import Contact from '../models/contact.model.js'
import extend from 'lodash/extend.js'
import errorHandler from './error.controller.js'
import nodemailer from 'nodemailer'

// Create a new contact (public) and optionally email site owner
const create = async (req, res) => {
    const contact = new Contact(req.body)
    try {
        await contact.save()

        // Best-effort email (non-blocking on failure)
        try {
            const host = process.env.SMTP_HOST
            const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 465
            const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : true
            const user = process.env.SMTP_USER
            const pass = process.env.SMTP_PASS
            const to = process.env.EMAIL_TO || 'rkfka9536@gmail.com'
            const from = process.env.EMAIL_FROM || user || 'no-reply@localhost'

            if (host && user && pass) {
                const transporter = nodemailer.createTransport({ host, port, secure, auth: { user, pass }})
                await transporter.sendMail({
                    from,
                    to,
                    replyTo: contact.email_address,
                    subject: `New contact from ${contact.first_name} ${contact.last_name}`,
                    text: `Name: ${contact.first_name} ${contact.last_name}\nEmail: ${contact.email_address}\nPhone: ${contact.contact_number}\n\nMessage:\n${contact.message}`
                })
            }
        } catch (mailErr) {
            console.error('Contact email send failed:', mailErr?.message)
        }

        return res.status(200).json({ message: 'Successfully created contact!' })
    } catch (err) {
        return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
    }
}

const list = async (req, res) => {
    try {
        const contacts = await Contact.find()
            .populate('userId', '_id name email')
            .select('userId first_name last_name email_address contact_number message created updated')
            .sort({ created: -1 })
        res.json(contacts)
    } catch (err) {
        return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
    }
}

const listByUser = async (req, res) => {
    try {
        const contacts = await Contact.find({ userId: req.params.userId })
            .select('userId first_name last_name email_address contact_number message created updated')
            .sort({ created: -1 })
        res.json(contacts)
    } catch (err) {
        return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
    }
}

const contactByID = async (req, res, next, id) => {
    try {
        const contact = await Contact.findById(id)
        if (!contact) return res.status(400).json({ error: 'Contact not found' })
        req.profile = contact
        next()
    } catch (err) {
        return res.status(400).json({ error: 'Could not retrieve contact' })
    }
}

const read = (req, res) => res.json(req.profile)

const update = async (req, res) => {
    try {
        let contact = req.profile
        contact = extend(contact, req.body)
        contact.updated = Date.now()
        await contact.save()
        res.json({ message: 'Contact updated successfully!', contact })
    } catch (err) {
        return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
    }
}

const remove = async (req, res) => {
    try {
        const contact = req.profile
        await contact.deleteOne()
        res.json({ message: 'Contact deleted successfully!' })
    } catch (err) {
        return res.status(400).json({ error: 'Failed to delete contact' })
    }
}

const removeAll = async (req, res) => {
    try {
        await Contact.deleteMany()
        res.json({ message: 'All contacts deleted successfully!' })
    } catch (err) {
        res.status(400).json({ error: 'Failed to delete all contacts' })
    }
}

export default { create, contactByID, read, list, listByUser, remove, update, removeAll }
