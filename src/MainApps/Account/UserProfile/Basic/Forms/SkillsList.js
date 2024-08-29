import React, { useState, useEffect } from 'react';
import { fetchAboutUsData } from '../../../../../CommonApps/AllAPICalls';
import classes from './SkillsView.module.css';
import Logo from '../../../../../CommonApps/Logo';

const SkillsView = (props) => {
    const [aboutUsInfo, setAboutUsInfo] = useState(null);

  useEffect(() => {
     
    const userId = props.userData.id ;
    fetchAboutUsData(userId)
      .then(response => {
        setAboutUsInfo(response.about_us.skills);
      })
      .catch(error => {
        console.error('Error fetching about us data:', error);
      });
  }, [props]);  

  return (
    <div>
      <div className={classes.skillsDiv}>
        <div className={classes.skillsInnerDiv}>
          <div className={classes.skillsContent}>
            {aboutUsInfo && (
              <div>
                {aboutUsInfo.map((skill) => (
                  <div key={skill.id}>{skill.name}</div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default SkillsView;
