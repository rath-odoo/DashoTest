import classes from "./PaymentPage.module.css";
import { MdDone } from "react-icons/md";
import img1 from "./c1.png";
import img2 from "./c2.png";
import img3 from "./c3.png";
import img4 from "./c4.png";
import Payment from "./PaymentHistory";
import qr from "./qrImg.jpg";
import { useState } from "react";

import CreditDebitCard from "./CreditDebitCard";
import AppPaymentCard from "./AppPaymentDetailsCard";
import TopCard from "./TopCard";

function App() {
  const [showQrForm, setQrForm] = useState(false);
  const showQrFormHandler = () => {
    setQrForm(true);
    setUpiForm(false);
    setNetBankingForm(false);
    setCardFrom(false);
  };

  const [showUpiForm, setUpiForm] = useState(false);
  const showUpiFormHandler = () => {
    setQrForm(false);
    setUpiForm(true);
    setNetBankingForm(false);
    setCardFrom(false);
  };

  const [showNetBanking, setNetBankingForm] = useState(false);
  const showNetBankingHandler = () => {
    setNetBankingForm(true);
    setQrForm(false);
    setUpiForm(false);
    setCardFrom(false);
  };

  const [showCardForm, setCardFrom] = useState(true);
  const showCardFormHandler = () => {
    setCardFrom(true);
    setNetBankingForm(false);
    setQrForm(false);
    setUpiForm(false);
  };

  return (
    <div className={classes.parentBillingContainer}>
      <div className={classes.leftContainer}>
        <div className={classes.MainHeading}>Subscribe To DiracAI</div>

        <div className={classes.topcardParent}>
          <TopCard />
        </div>

        <div className={classes.MainHeading2}>Billings Plans : </div>

        <div className={classes.topParent}>
          <div className={classes.Lcontainer}>
            <div className={classes.billedTitle}>Billed Monthly</div>

            <div className={classes.moneyContainer}>
              <div className={classes.billedPrice}>$ 100</div>

              <input type="radio" className={classes.YearlyRadioBtn} checked />
            </div>
            <div className={classes.taxDetails}>
              CGST & SGST Include In Amount
            </div>
          </div>

          <div className={classes.Ccontainer}>
            <div className={classes.billedTitle}>Quarterly Monthly</div>

            <div className={classes.moneyContainer}>
              <div className={classes.billedPrice}>$ 500</div>

              <input type="radio" className={classes.YearlyRadioBtn} checked />
            </div>
            <div className={classes.taxDetails}>
              CGST & SGST Include In Amount
            </div>
          </div>

          <div className={classes.Rcontainer}>
            <div className={classes.billedTitle}>Billed Yearly</div>

            <div className={classes.moneyContainer}>
              <div className={classes.billedPrice}>$ 1000</div>

              <input type="radio" className={classes.YearlyRadioBtn} checked />
            </div>
            <div className={classes.taxDetails}>
              CGST & SGST Include In Amount
            </div>
          </div>
        </div>

        <div className={classes.Line}></div>

        <div className={classes.PaymentDetails}>
          <div className={classes.paymentTitle}>Payment Details</div>

          <div className={classes.navigationBar}>
            <div className={classes.navigationMenu}>
              <button
                onClick={showNetBankingHandler}
                className={classes.netBanking}
              >
                Net Banking
              </button>

              <button onClick={showCardFormHandler} className={classes.card}>
                Card
              </button>

              <button onClick={showUpiFormHandler} className={classes.Upi}>
                UPI
              </button>

              <button onClick={showQrFormHandler} className={classes.qr}>
                QR Code
              </button>
            </div>
          </div>

          {showCardForm && (
            <div className={classes.cardPayment}>
              <div className={classes.cardPaymentMainContainer}>
                <div className={classes.cardNumberContainer}>
                  <div className={classes.CardText}>Card Number :</div>
                  <input className={classes.cardNumberEditBox} type="text" />
                </div>

                <div className={classes.horizontalContainer}>
                  <div className={classes.expiryContainer}>
                    <div className={classes.ExpiryText}>Expiration Date :</div>
                    <input className={classes.ExpirationEditBox} type="text" />
                  </div>

                  <div className={classes.cvvContainer}>
                    <div className={classes.textCvv}>CVV :</div>

                    <input className={classes.cvvEditBox} type="text" />
                  </div>
                </div>

                <div className={classes.submitBtn}>Subscribe</div>
              </div>
            </div>
          )}

          {showQrForm && (
            <div className={classes.qrForm}>
              <div className={classes.qrMaincontainer}>
                <img className={classes.qrCodeImage} src={qr}></img>
              </div>
            </div>
          )}

          {showUpiForm && (
            <div className={classes.upiForm}>
              <div className={classes.upiPaymentMainContainer}>
                <div className={classes.UpiContainer}>
                  <div className={classes.UpiText}>UPI Id :</div>
                  <input className={classes.upiNumberEditBox} type="text" />
                </div>

                <div className={classes.upipayBtnBtn}>Pay</div>
              </div>
            </div>
          )}

          {showNetBanking && (
            <div className={classes.netBanking1}>
              <div className={classes.selectBank}>Select Bank :</div>

              <div className={classes.horiLine2}></div>

              <div className={classes.firstContainer}>
                <input
                  type="radio"
                  className={classes.YearlyRadioBtn}
                  checked
                />
                <div className={classes.hdfcBank}>HDFC Bank</div>
              </div>

              <div className={classes.secoundContainer}>
                <input
                  type="radio"
                  className={classes.YearlyRadioBtn}
                  checked
                />

                <div className={classes.IcBank}>ICICI Bank</div>
              </div>

              <div className={classes.thirdContainer}>
                <input
                  type="radio"
                  className={classes.YearlyRadioBtn}
                  checked
                />

                <div className={classes.axBank}>AXIS Bank</div>
              </div>

              <div className={classes.fourContainer}>
                <input
                  type="radio"
                  className={classes.YearlyRadioBtn}
                  checked
                />

                <div className={classes.sbiBank}>SBI Bank</div>
              </div>

              <div className={classes.fifthContainer}>
                <input
                  type="radio"
                  className={classes.YearlyRadioBtn}
                  checked
                />

                <div className={classes.kotakBank}>Kotak Bank</div>
              </div>
            </div>
          )}

          <div className={classes.horizontalLine}></div>

          <div className={classes.paymentHistoryTitle}>Payment History :</div>

          <div className={classes.paymentHistoryDetails}>
            <div className={classes.paymentContainer}>
              <div className={classes.srNo}>#</div>

              <div className={classes.Date}>Date</div>

              <div className={classes.Amount}>Amount</div>

              <div className={classes.PaymnetMethod}>Payment Mehthod</div>

              <div className={classes.Status}>Status</div>
              <div className={classes.Invoice}>Invoice</div>
            </div>

            <Payment />
            <Payment />
            <Payment />
            <Payment />
            <Payment />
            <Payment />
            <Payment />
            <Payment />
          </div>

          <div className={classes.creditDetailsCard}>
            <CreditDebitCard />
          </div>

          <div className={classes.apppaymentHistoryTitle}>
            Payment To DiracAI
          </div>

          <div className={classes.appCardContainer}>
            <AppPaymentCard />
          </div>
        </div>
      </div>

      <div className={classes.rightContainer}>
        <div className={classes.featuresContainer}>
          <div className={classes.title}>Unlimited</div>

          <div className={classes.horiLine}></div>
          <div className={classes.f1Container}>
            <MdDone className={classes.img} />
            <div className={classes.heading}>Unlimited</div>
            <div className={classes.subHeading}>Storage</div>
          </div>

          <div className={classes.f1Container}>
            <MdDone className={classes.img} />
            <div className={classes.heading}>Unlimited</div>
            <div className={classes.subHeading}>Email</div>
          </div>

          <div className={classes.f1Container}>
            <MdDone className={classes.img} />
            <div className={classes.heading}>Unlimited</div>
            <div className={classes.subHeading}>Chat</div>
          </div>

          <div className={classes.f1Container}>
            <MdDone className={classes.img} />
            <div className={classes.heading}>Unlimited</div>
            <div className={classes.subHeading}>Books</div>
          </div>

          <div className={classes.f1Container}>
            <MdDone className={classes.img} />
            <div className={classes.heading}>Unlimited</div>
            <div className={classes.subHeading}>Video Calls</div>
          </div>

          <div className={classes.f1Container}>
            <MdDone className={classes.img} />
            <div className={classes.heading}>Unlimited</div>
            <div className={classes.subHeading}>24 / 7 Support</div>
          </div>

          <div className={classes.f1Container}>
            <MdDone className={classes.img} />
            <div className={classes.heading}>Unlimited</div>
            <div className={classes.subHeading}>Full Access</div>
          </div>
        </div>

        <div className={classes.mainCardContainer}>
          <div className={classes.cardTitle}>We Accept The Following Cards</div>

          <div className={classes.cardContainer}>
            <img className={classes.card1} src={img1}></img>
            <img className={classes.card2} src={img2}></img>
            <img className={classes.card3} src={img3}></img>
            <img className={classes.card4} src={img4}></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
