import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { prefersReducedMotion } from '../../../lib/media';
import { ContactHeader } from './ContactHeader';
import { ContactVideoBlock } from './ContactVideoBlock';
import { ContactFormCard } from './ContactFormCard';
import { SERVICE_OPTIONS } from './types';

gsap.registerPlugin(ScrollTrigger);

export const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const leftVideoRef = useRef<HTMLDivElement>(null);
  const rightFormRef = useRef<HTMLDivElement>(null);

  const [selectedService, setSelectedService] = useState<string>(SERVICE_OPTIONS[0]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [ticketId, setTicketId] = useState('8492');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !phone.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setTicketId(String(Math.floor(1000 + Math.random() * 9000)));
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFirstName('');
    setLastName('');
    setCompany('');
    setPhone('');
    setEmail('');
    setComment('');
  };

  // ── GSAP ScrollTrigger Entrance Animation ──────────────────────────────
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
          toggleActions: 'play none none none',
        },
      });

      // 1. Появление шапки
      tl.from([badgeRef.current, titleRef.current, descRef.current], {
        opacity: 0,
        y: 18,
        stagger: 0.08,
        duration: 0.65,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
      })
      // 2. Линия-разделитель
      .from(
        borderRef.current,
        {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 0.65,
          ease: 'power2.out',
          clearProps: 'transform',
        },
        '-=0.45'
      )
      // 3. Левое видео (About Video)
      .from(
        leftVideoRef.current,
        {
          opacity: 0,
          x: -30,
          scale: 0.97,
          filter: 'blur(8px)',
          duration: 0.85,
          ease: 'power3.out',
          clearProps: 'transform,opacity,filter',
        },
        '-=0.45'
      )
      // 4. Правая форма (Luminous Frosted Glass)
      .from(
        rightFormRef.current,
        {
          opacity: 0,
          x: 30,
          scale: 0.97,
          filter: 'blur(8px)',
          duration: 0.85,
          ease: 'power3.out',
          clearProps: 'transform,opacity,filter',
        },
        '-=0.75'
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="contacts"
      ref={sectionRef}
      className="relative z-10 flex w-full items-center justify-center px-[15px] pb-[15px]"
    >
      <div className="relative w-full rounded-[20px] bg-[#f2f4f7] overflow-hidden px-6 sm:px-10 md:px-14 lg:px-14 xl:px-16 py-16 sm:py-20 md:py-24 lg:py-20">
        
        {/* 1. Шапка секции */}
        <ContactHeader
          badgeRef={badgeRef}
          titleRef={titleRef}
          descRef={descRef}
          borderRef={borderRef}
        />

        {/* 2. Контент: Слева Видео About + Справа Luminous Glass Форма */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          <ContactVideoBlock ref={leftVideoRef} />
          <ContactFormCard
            ref={rightFormRef}
            selectedService={selectedService}
            setSelectedService={setSelectedService}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            company={company}
            setCompany={setCompany}
            phone={phone}
            setPhone={setPhone}
            email={email}
            setEmail={setEmail}
            comment={comment}
            setComment={setComment}
            isSubmitting={isSubmitting}
            isSubmitted={isSubmitted}
            ticketId={ticketId}
            onSubmit={handleSubmit}
            onReset={handleReset}
          />
        </div>

      </div>
    </section>
  );
};
