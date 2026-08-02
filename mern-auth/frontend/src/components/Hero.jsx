import { Container, Card, Button } from 'react-bootstrap';

const Hero = () => {
  return (
    <div className=' py-4'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-4 d-flex flex-column align-items-center hero-card bg-light w-75 shadow-lg rounded'>
          <h1 className='text-center mb-4'>MERN Authentication</h1>
          <p className='text-center mb-4'>
            This is a boilerplate for MERN authentication that stores a JWT in
            an HTTP-Only cookie. It also uses Redux Toolkit and the React
            Bootstrap library
          </p>
          <div className='d-flex'>
            <Button variant='primary' href='/login' className='me-3 shadow-lg'>
              Sign In
            </Button>
            <Button variant='secondary' href='/register' className='shadow-lg'>
              Register
            </Button>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
