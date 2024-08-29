import Connect from './images/page-2/connect (2).png';
import Learn from './images/page-2/learn (2).png';
import Teach from './images/page-2/teach.png';
import Manage from './images/page-2/manage (2).png';
import './pageNew2.css';


function PageNew2 (){

    return (
        <div className="mainContainer">
          <div className="bodyContainer">

            <div className="holder">
              <div className="imageContainer">
                <img
                  src={Connect}
                  alt="connecting image"
                />
              </div>
              <div className="titleContainer">Connect</div>
              <div className="headingContainer">Expand Network</div>
            </div>
            <div className="holder">
              <div className="imageContainer">
                <img
                  src={Learn}
                  alt="connecting image"
                />
              </div>
              <div className="titleContainer">Learn</div>
              <div className="headingContainer">Enhance skills</div>
            </div>

            <div className="holder">
              <div className="imageContainer">
                <img
                  src={Teach}
                  alt="connecting image"
                />
              </div>
              <div className="titleContainer">Teach</div>
              <div className="headingContainer">Share Your Expertise</div>
            </div>
            <div className="holder">
              <div className="imageContainer">
                <img
                  src={Manage}
                  alt="connecting image"
                />
              </div>
              <div className="titleContainer">Manage</div>
              <div className="headingContainer">Organise Everything</div>
            </div>
          </div>
        </div>
      );


/*

 <div className={classes.mainContainer}>
          <div className={classes.bodyContainer}>
            <div className={classes.holder}>
              <div className={classes.imageContainer}>
                <img
                  src={Connect}
                  alt="connecting image"
                />
              </div>
              <div className={classes.titleContainer}>Connect</div>
              <div className={classes.headingContainer}>Expand Network</div>
            </div>
            <div className={classes.holder}>
              <div className={classes.imageContainer}>
                <img
                  src={Learn}
                  alt="connecting image"
                />
              </div>
              <div className={classes.titleContainer}>Learn</div>
              <div className={classes.headingContainer}>Enhance skills</div>
            </div>
            <div className={classes.holder}>
              <div className={classes.imageContainer}>
                <img
                  src={Teach}
                  alt="connecting image"
                />
              </div>
              <div className={classes.titleContainer}>Teach</div>
              <div className={classes.headingContainer}>Share Your Expertise</div>
            </div>
            <div className={classes.holder}>
              <div className={classes.imageContainer}>
                <img
                  src={Manage}
                  alt="connecting image"
                />
              </div>
              <div className={classes.titleContainer}>Manage</div>
              <div className={classes.headingContainer}>Organise Everything</div>
            </div>
          </div>
        </div>
      );


*/


}

export default PageNew2;
