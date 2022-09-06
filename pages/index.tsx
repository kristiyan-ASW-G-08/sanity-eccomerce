import FeaturedProducts from '@/components/FeaturedProducts';
import Hero from '@/components/Hero';
import LatestProducts from '@/components/LatestProducts';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <>
      <Hero />
      <FeaturedProducts/>
      <LatestProducts/>
    </>
  );
};

export default Home;
