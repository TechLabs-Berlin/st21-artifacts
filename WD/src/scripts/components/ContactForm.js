import React, {useState} from 'react';
import emailjs, { send } from 'emailjs-com';
import { useUserInformation } from '../context/user-context/UserContext';

 export default function ContactForm(props) {
 const { userInformation } = useUserInformation();
 const [message, setMessage] = useState();


    function sendEmail(e){
      e.preventDefault();
    
      console.log(props.ownerInformation.mail.split(':')[1])
      emailjs.send('artifactsgmail', 'template_7w88qwe', {
        from_name: userInformation.name,
        message_to_send: message,
        reply_to: userInformation.mail,
        to_email: props.ownerInformation.mail.split(':')[1],
        to_name: props.ownerInformation.name
      }, 'user_9AIsWEje6EriowiE0uOR8')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
      }
  

  return (
    <form className="contact-form" onSubmit={sendEmail}>
      <label>Message</label>
      <textarea name="message_to_send" value={message} onChange={ (e) => setMessage(e.target.value)}  />
      <input type="submit" value="Send" />
    </form>
  );
}

  
