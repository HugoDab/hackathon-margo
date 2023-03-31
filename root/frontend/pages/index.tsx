import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { MainLayout } from '@/components/MainLayout'
import { Map } from '@/components/Map'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>DrinkWater</title>
        <meta name="description" content="DrinkWater app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout header={<h1>Welcome to DrinkWater</h1>}>
        <Map/>
      </MainLayout>
    </>
  )
}
