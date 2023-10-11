import Image from 'next/image'
import styles from './page.module.css'
import { Button } from '../../components/Button'
import { Card } from '../../components/Card'

export default function Home() {
  return (
    <>
      <Button text="hi" />
      <Card title="Hello" />
    </>
  )
}
