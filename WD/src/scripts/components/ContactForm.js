import React, {useState} from 'react';
import emailjs, { send } from 'emailjs-com';
import { useUserInformation } from '../context/user-context/UserContext';

 export default function ContactForm(props) {
  const { userInformation } = useUserInformation();
  const [message, setMessage] = useState();
  const [messageStatus, setMessageStatus] = useState("Not sent");
  const [buttonEnabled, setButtonEnabled] = useState(false);


  function sendEmail(e){
    e.preventDefault();
    
    setButtonEnabled(false);
    console.log(props.ownerInformation.mail.split(':')[1])
    emailjs.send('artifactsgmail', 'template_7w88qwe', {
        from_name: userInformation.name,
        message_to_send: message,
        reply_to: userInformation.mail,
        to_email: props.ownerInformation.mail,
        to_name: props.ownerInformation.name
      }, 'user_9AIsWEje6EriowiE0uOR8')
      .then((result) => {
          setMessageStatus("Success")
          console.log(result.text);
      }, (error) => {
          setMessageStatus("Error")
          console.log(error.text);
      });
  }
  
  switch (messageStatus){

    case 'Not sent':
      return (
        <form className="contact-form" onSubmit={sendEmail}>  
          <div>
            <textarea 
              className="message-to-send" 
              name="message_to_send" 
              placeholder={"Write " + props.ownerInformation.name + " a message..."} 
              value={message} 
              onChange={ (e) => {
                setMessage(e.target.value);
                setButtonEnabled(e.target.value);
                }
              }
            /> 
          </div>
          {buttonEnabled
            ?  <input type="submit" value="Send" className="contact-owner"/>
            :  <input type="submit" value="Send" className="contact-owner" disabled/>
          }
        </form>
      );

    case 'Success': 
      return (
        <p className="message-sent-feedback"><b>Message sent!</b> &#9989;
        </p>
      ); 

    default : 
      return (
        <p>error</p>
      );
  }
}
