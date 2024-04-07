import { useRouter } from 'next/router';
import BackgroundImg from '@/public/assets/cusisnappedBackgroundPage.jpeg';

const SubmissionPage = () => {
    // fetch id from query
  const router = useRouter();
  const { customerId } = router.query;

  return (
    <div className='submissions'>
      <img className="background-img" src={BackgroundImg.src}  alt="Cusisnapped Background Image" />
      <div className="px-4 py-5 h-2/5 w-1/5 bg-white bg-opacity-80 border-solid rounded-md">
        <h1>Submission confirmed!</h1>
        <p className='mt-2'>
          Thank you for subscribing!
          When the full site is up, 
          you&apos;ll be notified by email to sign up
          to order your very own Cusisnapped art piece!
          Stay tuned!!
          <br />
          <br />

          Until then, keep your raffle number
          <strong>
            {` (${customerId}) `}
          </strong>
          to see if today will be that day!
        </p>
        <button
            onClick={() => router.push('/')}
            className="flex w-1/2 m-auto mt-4 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
            Done
        </button>
      </div>
    </div>
  );
}

export default SubmissionPage;