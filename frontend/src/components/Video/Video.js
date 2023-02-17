import './Video.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';


function Video() {
  const [showA, setShowA] = useState(false);
  const [testEmail, setTestEmail] = useState(null);


  const toggleShowA = (data) => {
    setTestEmail(data.preview)
    setShowA(!showA);
  }

  const email = {
    recipient: 'matthewchun.18@gmail.com',
    subject: 'Matthew Invited You to Join a Team Meeting',
    message: 'Your group member, Matthew Chun, has sent you an invite to join a team meeting on Groupstarter. Head over now!'
  }

  const handleSend = async () => {
    await axios.post("http://localhost:4000/send-email", email)
      .then((response) => {
        console.log('Email sent successfully: ', response.data);
        toggleShowA(response.data)
      })
      .catch((error) => {
        console.log('Error sending email:', error);
      })
  }


  return (
    <div className="video">
      <div className="video-groupmates">
        <Card className='video-cards'>
          <Card.Body>
            <Card.Title>Prieya</Card.Title>
            <Card.Text>
              <Table bordered style={{ color: 'white' }}>
                <tbody>
                  <tr>
                    <td>Email: </td>
                    <td>pnaraine99@gmail.com</td>
                  </tr>
                  <tr>
                    <td>Focus: </td>
                    <td>Frontend</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Text>
            <Button variant="primary" onClick={handleSend}>Email Notification</Button>
          </Card.Body>
        </Card>
        <Card className='video-cards'>
          <Card.Body>
            <Card.Title>Matthew</Card.Title>
            <Card.Text>
              <Table bordered style={{ color: 'white' }}>
                <tbody >
                  <tr>
                    <td>Email: </td>
                    <td>matthewchun.18@gmail.com</td>
                  </tr>
                  <tr>
                    <td>Focus: </td>
                    <td>Video Call Functionality</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Text>
            <Button variant="primary" onClick={handleSend}>Email Notification</Button>
          </Card.Body>
        </Card>
        <ToastContainer className="p-3" position='bottom-end'>
          <Toast show={showA} onClose={toggleShowA}>
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Groupstarter</strong>
              <small>Just now</small>
            </Toast.Header>
            <Toast.Body>
              <p>Email notification sent!</p>
              <p>Preview URL: {testEmail}</p>
            </Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
      <div className="d-grid gap-2 video-separation video-zoom-btn">
        <h1>Join a Group Zoom Call</h1>
        <Link to='/zoom'>
          <Button variant='primary' size='lg' >Join a Zoom Call</Button>
        </Link>
      </div>
    </div>
  );
}

export default Video;
