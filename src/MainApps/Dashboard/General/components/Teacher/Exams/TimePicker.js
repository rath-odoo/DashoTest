import React, { useState } from "react";
import { CustomTimePicker } from '../../../../../../CommonApps/FormInputObjects';

    const TimePicker = () => {

    const [time, setTime] = useState({
        hour:"hh",
        minute:"mm",
        ampm:"AM"
       });


  return (
    <div className="firstFieldBlock">
      <CustomTimePicker time={time} setTime={setTime} width="200px" requirement="*"/>
    </div>
  );
};

export default TimePicker;