/**********************************************************************
 *  Parrot Bot
 * 
 *  A simple script created to deploy a Google Chat bot that repeats
 *  what you message it. 
 *
 *  Created by: E.Cope                        (Last edit: 2/6/21)
 **********************************************************************
 */


/**
  *  Responds to a MESSAGE event in Google Chat.
  * 
  *  @param {Object} e -- the event object from Google Chat.
  */
const onMessage = (e) => {

  let name = ""

  // [CASE] Direct Message -->
  if (e.space.type == "DM") { 
    name = "You" 
  }
  // [CASE] Space/Room/Group Chat Message -->
  else {
    // Grab the user's name.
    name = e.user.displayName
    // Split into two parts: [firstname, lastname]
    name = name.split(" ")
    // Use only the first name.
    name = name[0]
  }

  // The message with all bot mentions stripped out.
  let words = e.message.argumentText
  // Format the response message:
  let message = `${name} said: "${words.trim()}"`

  // Send the message to chat.
  return { "text": message }
}
//[END -- onMessage]


/**
  *  Responds to an ADD_TO_SPACE event in Google Chat.
  * 
  *  @param {Object} e -- the event object from Google Chat.
  */
const onAddToSpace = (e) => {

  let msg = ""
  let message = ""
  
  // [CASE] Direct Message (1 on 1 convo) -->
  if (e.space.singleUserBotDm) {
    // Grab the user's name.
    let fullName = e.user.displayName
    // Split into [firstname, lastname].
    let names = fullName.split(" ")
    // Form the greeting using only first name.
    msg = `Hey ${names[0]}! Thanks for the DM! 🦜`
  } 
  // [CASE] Space/Room/Group Chat -->
  else {
    // Grab space's name -or- apply default: "the chat".
    const spaceName = (e.space.displayName ? e.space.displayName : "the chat")
    // Form the greeting message.
    msg = `Thanks for adding me to ${spaceName}! I'll copy everything you say! 🦜`
  }
  // Bot @mention -->
  if (e.message) {
    // The message with all bot mentions stripped out.
    let words = e.message.argumentText
    // Form the whole reply message with greeting + repeat.
    message = `${msg}
    You said: "${words.trim()}"`
  }

  // Send the message to chat.
  return { "text": message }  
}
//[END -- onAddToSpace] 


/**
  *  Responds to a REMOVE_FROM_SPACE event in Google Chat.
  * 
  *  @param {Object} e -- the event object from Google Chat.
  */
const onRemoveFromSpace = (e) => {
  // Grab space's name -or- apply a default.
  const spaceName = (e.space.name ? e.space.name : "the chat")
  // Print the message to the console.
  console.info(`Parrot Bot was removed from ${spaceName}.`)
}
//[END -- onRemoveFromSpace]

