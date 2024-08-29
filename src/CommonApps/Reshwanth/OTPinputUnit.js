import classes from './OTPinputUnit.module.css';
const OTPinputUnit=(props)=>{
return (
   <input type="number" 
	maxLength="1" 
	className={classes.otpUnit}
	onChange={props.handleChangeOTP}
	name={props.name}
	ref={props.inputRef}
	onKeyPress={(e) => {
		if (e.target.value.length >= 1 && e.key !== 'Backspace') {
		  e.preventDefault();
		}
	  }}
	/>
   );
}
export default OTPinputUnit;
