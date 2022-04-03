// Allows us to access the query paramters from the url
import { useRouter } from 'next/router';

// Head component helps seo
import Head from 'next/head'

export default function Car({car}) {
  const router = useRouter();
  const { id } = router.query;

  // use the prop in jsx to extract the data from the api
  return (
    <>
    <Head>
      <title>{car.color} {car.id}</title>
    </Head>
      <h1>Hello {id}</h1>
      <img src={car.image} width="300px"/> 
    </>
  );
}

// loads the function at build time
export async function getStaticProps({ params }) {
  const req = await fetch(`http://localhost:3000/${params.id}.json`);
  const data = await req.json();

// return the data to the component via props
  return {
    props: {
      car: data,
    },
  };
}

// tells next which dynamic pages to render
export async function getStaticPaths(){

  const req = await fetch('http://localhost:3000/cars.json');
  const data = await req.json()

  const paths= data.map(car=>{
    return { params:{id:car}}
  })

  return{
    paths,
    fallback:false
  }

}


// SSR : re-renders the content on every request instead once during build

// export async function getServerSideProps({params}){
//   const req = await fetch(`http://localhost:3000/${params.id}.json`);
//   const data = await req.json();

// // return the data to the component via props
//   return {
//     props: {
//       car: data,
//     },
//   };
// }