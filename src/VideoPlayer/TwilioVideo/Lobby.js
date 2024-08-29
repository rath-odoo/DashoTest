



const Lobby =({
  username,
  handleUsernameChange,
  roomName,
  handleRoomNameChange,
  handleSubmit,
  connecting,
})=>{


return (

<div>


<form onSubmit={handleSubmit} style={{marginLeft: '100px'}}>
<h2>Enter a room</h2>

    <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="field"
          value={username}
          onChange={handleUsernameChange}
          readOnly={connecting}
          required
        />
      </div>

      <div>
        <label htmlFor="room">Room name:</label>
        <input
          type="text"
          id="room"
          value={roomName}
          onChange={handleRoomNameChange}
          readOnly={connecting}
          required
        />
      </div>


     <button type="submit" disabled={connecting}>
        {connecting ? "Connecting" : "Join"}
      </button>



</form>
</div>

);


}


export default Lobby;
