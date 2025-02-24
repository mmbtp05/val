"use client"

import Head from 'next/head'
import { useState, useEffect } from 'react'

export default function Home() {
  const [showContent, setShowContent] = useState(false)
  const [personalMessage, setPersonalMessage] = useState("I am sorry from deepest. I know, I have given you so much pain and can't give anymore so I am going back from your life please forgive me. I will definately come back with more love and energy to cherish you, i will give your innocence back. I promise I will be back. I know this more difficult for you and maybe you down even forgive me, but thats okay I deserve this.\nYOU are an amazing person I have every met, loved me selflessly and stayed with me in every situation and In return I was not even able to give the respect and love. I AM SORRY.")

  useEffect(() => {
    setShowContent(true)
  }, [])

  return (
    <div className="container">
      <Head>
        <title>To My Love | From My Heart</title>
        <meta name="description" content="A heartfelt apology" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`main ${showContent ? 'fade-in' : ''}`}>
        <div className="letter-content">
          <h1 className="title">
            To <span className="highlight">My Love</span>
          </h1>
          
          <div className="letter-text">
            <p>
              My dearest, I'm writing this with a heavy heart and deep regret for all the pain I've caused you over the past two years. Every harsh word I spoke, every moment I made you doubt my love - they weigh heavily on my conscience. I know now, more than ever, how my words have hurt you deeply.
            </p>
            
            <p>
              I'm not here to ask for immediate forgiveness - I know I haven't earned that right. What I'm asking for is time. Time to work on myself, to grow into someone who deserves your love, someone who will cherish and protect your heart instead of causing it pain. I'm going away for a while, not to run from our problems, but to face my own demons and transform into a better person.
            </p>

            <p>
              You've shown me what true love means through your patience and understanding, even when I didn't deserve it. I promise to come back with more positivity, more understanding, and a heart full of the love you deserve. Every day away from you will be dedicated to becoming someone worthy of your trust again.
            </p>

            <div className="personal-message-section">
              <h2>My Personal Promise to You:</h2>
              <textarea 
                className="personal-message"
                placeholder="Write your personal message here..."
                value={personalMessage}
                onChange={(e) => setPersonalMessage(e.target.value)}
                rows={6}
              />
            </div>

            <div className="heart"></div>

            <div className="signature">
              <p>With all my love and deepest regret,</p>
              <p>Forever Yours</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}