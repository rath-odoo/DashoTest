



let style={

	height:"40px",
	width:"50px",
	backgroundColor:"var(--themeColor)",
	borderStyle:"none",
	borderRadius:"7px",
	color:"white",
	fontSize:"30px",
	fontWeight:"bold"

}


let styleDiv={

	position:"relative",
        borderStyle:"none"
}


let styleT={
	position: "absolute",
	left:"20px"

}

let styleI={
	position:"absolute",
        left:"22px",
	color:"var(--themeColor)",
	fontWeight:"900",
	height:"25px",
	width:"4px",
	borderStyle:"solid",
	top:"0px",
	backgroundColor:"var(--themeColor)"
}



const Logo=()=>{


return <button style={style} type="button">

	<div style={styleDiv}> 
		H 
		<div style={styleI}> </div>
		<span style={styleT}> T </span>
	</div>
  
</button>

}

export default Logo;
