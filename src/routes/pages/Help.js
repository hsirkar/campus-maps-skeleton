import { ExpandMore } from '@mui/icons-material';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    TextField,
    Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const faqs = [
    {
        question: 'What is campus maps?',
        answer: (
            <React.Fragment>
                <p>Welcome to campus-maps!</p>
                <p>
                    We are a new social media app that's all about sharing and
                    discovering cool, new <b>🌄 places 🌄</b> and{' '}
                    <b>✨ events ✨</b> on campus! For example, you can:
                </p>
                <ul>
                    <li>
                        Have a quick <b>pick-up game</b> of basketball or soccer
                    </li>
                    <li>
                        Discover secret <b>study spots</b> to get that A{' '}
                    </li>
                    <li>
                        Have a debate about where the <b>nicest bathrooms</b>{' '}
                        are
                    </li>
                    <li>
                        See your friends' <b>favorite places</b> on campus
                    </li>
                    <li>
                        Never miss the next <b>career event</b>
                    </li>
                    <li>
                        Host a <b>party</b> that's absolutely <b>legendary</b>
                    </li>
                    <li>
                        Make friends at a <b>new student clubs</b> you've never
                        been to
                    </li>
                </ul>
                <p>and much more!</p>
                <p>
                    Think of it as Waze or Google My Maps, but for your campus.
                </p>
            </React.Fragment>
        ),
    },
    {
        question: 'Who can see my posts?',
        answer: (
            <React.Fragment>
                <p>Lorem ipsum</p>
            </React.Fragment>
        ),
    },
    {
        question: 'How can I follow people?',
        answer: (
            <React.Fragment>
                <p>Lorem ipsum</p>
            </React.Fragment>
        ),
    },
    {
        question: 'Do you track my location?',
        answer: (
            <React.Fragment>
                <p>Lorem ipsum</p>
            </React.Fragment>
        ),
    },
    {
        question: "How do I report something I don't like?",
        answer: (
            <React.Fragment>
                <p>Lorem ipsum</p>
            </React.Fragment>
        ),
    },
];

export default function Help() {
    const handleSubmit = event => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
        <React.Fragment>
            <Typography variant="h1">Help Center</Typography>
            <Typography>
                Support has arrived! Discover cool features, learn new things,
                and get help today.
            </Typography>

            <Typography variant="h2" mt={5}>
                Popular Topics
            </Typography>

            {faqs.map((faq, i) => (
                <Accordion key={i}>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel1a-content"
                        id="panel1a-header">
                        <Typography fontSize="1em" fontWeight="600">
                            {faq.question}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ py: 0, fontSize: '0.9em' }}>
                        {faq.answer}
                    </AccordionDetails>
                </Accordion>
            ))}

            <Typography variant="h2" mt={5}>
                Contact Us
            </Typography>
            <Typography>
                Still have an unanswered question? Let us know and we'll get
                back to you as soon as possible:
            </Typography>

            <Box component="form" onSubmit={handleSubmit} noValidate>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="message"
                    label="Question/issue"
                    multiline
                    rows={8}
                />
                <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Submit
                </Button>
            </Box>
        </React.Fragment>
    );
}
