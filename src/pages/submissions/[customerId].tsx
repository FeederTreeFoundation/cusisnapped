import { useRouter } from 'next/router';
import BackgroundImg from '@/public/assets/cusisnappedBackgroundPage.jpeg';

const SubmissionPage = () => {
    // fetch id from query
  const { query } = useRouter();
  const { customerId } = query;

  return (
    <div>
      <img className="background-img" src={BackgroundImg.src}  alt="cusisnapped Background mage" />
      <h1>Submission confirmed!</h1>
      <p>{`
        Thank you for subscribing!\n
        When the full site is up, 
        you'll be notified by email to sign up
         to order your very own Cusisnapped art piece!
         Stay tuned!!\n\n

        Until then, keep your raffle number (${customerId})
        to see if today will be that day!`}</p>
    </div>
  );
}

export default SubmissionPage;