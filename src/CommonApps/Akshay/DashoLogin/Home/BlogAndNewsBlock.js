import classes from "./BlogAndNewsBlock.module.css";
import bookAppointment from "./bookAppointment.jpg";
import bn1 from "./bn1.jpg";
import bn2 from "./bn2.jpg";
import bn3 from "./bn3.jpg";
import bn4 from "./bn4.jpg";
import SingleBlog from "./SingleBlog";

import BlogImage1 from "./BL1.jpg";
import BlogImage2 from "./BL2.png";
import BlogImage3 from "./BL3.jpg";
import BlogImage4 from "./BL4.jpeg";



function BlogAndNewsBlock() {
  
  let title1 = "Everything You Need To Know About RERA Odisha";
  let text1 =
    "The emergence of the Real Estate Regulatory Authority brought a paradigm shift in the realty sector of Odisha. There were many conflicts between the buyers and sellers of real estate in the past  ...";
  let link1 = "https://www.squareyards.com/blog/rera-odisha-rerat";

  let title2 = "Working of RERA after its enactment";
  let text2 =
    "Real Estate is one of the most globally recognized sectors. In India, real estate plays a major role in employment generation. It is the second-largest employment generation sector in India...";
  let link2 =
    "https://rerafiling.com/rera-article-detail.php/727/working-of-rera-after-its-enactment";

  let title3 = "Legal Remedies if real estate project is stucked";
  let text3 =
    "Real Estate Sector, which seems to be one of the major contributors in the inclusive growth of the nation with the contribution of around 8% of total GDP. Remarkable performance of this Industry...";
  let link3 =
    "https://rerafiling.com/rera-article-detail.php/722/legal-remedies-if-real-estate-project-is-stucked";

  let title4 = "Best RERA Practices to be followed by Builders";
  let text4 =
    "The Real Estate Regulatory Act, 2016 was enacted for ease of difficulties being faced by the Builders as well as the allottees in transacting through the earlier complex system of Real Estate regulations and reliefs...";
  let link4 =
    "https://rerafiling.com/rera-article-detail.php/717/best-rera-practices-to-be-followed-by-builders";

  return (
    <div className={classes.blogAndNewsContainer}>
      <div className={classes.latest}>
        <div className={classes.latestTitle}>Blogs</div>
        <div className={classes.latestsubTitle}>Latest Blogs</div>
      </div>

      <div className={classes.newsContainer}>
        <SingleBlog
          title={title1}
          text={text1}
          link={link1}
          image={BlogImage1}
        />
        <SingleBlog
          title={title2}
          text={text2}
          link={link2}
          image={BlogImage2}
        />
        <SingleBlog
          title={title3}
          text={text3}
          link={link3}
          image={BlogImage3}
        />
        <SingleBlog
          title={title4}
          text={text4}
          link={link4}
          image={BlogImage4}
        />
      </div>
    </div>
  );
}

export default BlogAndNewsBlock;
