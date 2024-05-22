 import TitleSection from '@/components/landing-page/title-section';
 import { Button } from '@/components/ui/Button';
 import React from 'react'
 import Banner from '../../../public/page_banner.png';
 import Cal from '../../../public/Cal.png';
 import CustomCard from '@/components/landing-page/custom-card';
 import Diamond from '../../../public/icons/diamond.svg';
 import CheckIcon from '../../../public/icons/check.svg';
 import Banner2 from '../../../public/appBanner2.png';
 import { CLIENTS, PRICING_CARDS, PRICING_PLANS, USERS } from '@/lib/constants';
 import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { randomUUID } from 'crypto';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import { CardContent, CardDescription, CardTitle } from '@/components/ui/card';
 const HomePage = () => {
   return (
  <>
    <section
        className=" overflow-hidden
      px-4
      sm:px-6
      mt-10
      sm:flex
      sm:flex-col
      gap-4
      md:justify-center
      md:items-center"
      >
        <TitleSection
          pill="✨ Your Workspace, Perfected"
          title="All-In-One Collaboration and Productivity Platform"
        />
        <div
          className="bg-white
          p-[2px]
          mt-6
          rounded-xl
          bg-gradient-to-r
          from-slate-500
          to-slate-700
          sm:w-[300px]
        "
        >
 
          <Button variant="outline" className=" w-full rounded-[10px] p-6 text-2xl bg-background z-20">Get Free Now!</Button>
        </div>
        <div
          className="md:mt-[-90px]
          sm:w-full
          w-[750px]
          flex
          justify-center
          items-center
          mt-[-40px]
          relative
          sm:ml-0
          ml-[-50px]
        "
        >
          <Image
            src={Banner}
            alt="Application Banner"
            className='w-[70%] h-[70%]'
          />
          <div
            className="bottom-0
            top-[50%]
            bg-gradient-to-t
            dark:from-background
            left-0
            right-0
            absolute
            z-10
          "
          >
          </div>
        </div>
    </section>

    <section 
    className="relative">
      <div
        className="overflow-hidden
        flex
        after:content['']
        after:dark:from-slate-900
        after:to-transparent
        after:from-background
        after:bg-gradient-to-l
        after:right-0
        after:bottom-0
        after:top-0
        after:w-20
        after:z-10
        after:absolute

        before:content['']
        before:dark:from-slate-900
        before:to-transparent
        before:from-background
        before:bg-gradient-to-r
        before:left-0
        before:top-0
        before:bottom-0
        before:w-20
        before:z-10
        before:absolute
      ">
        {[...Array(2)].map((arr) => (
              <div
                key={arr}
                className="flex
                  flex-nowrap
                  animate-slide
            "
              >
                {CLIENTS.map((client) => (
                  <div
                    key={client.alt}
                    className=" relative
                      w-[200px]
                      m-20
                      shrink-0
                      flex
                      items-center
                    "
                  >
                    <Image
                      src={client.logo}
                      alt={client.alt}
                      width={200}
                      className="object-contain max-w-none"
                    />
                  </div>
                ))}
              </div>
            ))}
      </div>
    </section>

    <section
      className="px-4
      sm:px-6
      flex
      justify-center
      items-center
      flex-col
      relative
      ">
        <div
        className="w-[30%]
        blur-[120px]
        rounded-full
        h-32
        absolute
        bg-slate-400
        -z-10
        top-22
        "/>
        <TitleSection
          title="Keep track of your free tier resource usage"
          subheading="Capture your ideas, thoughts, and meeting notes in a structured and organized manner."
          pill="Features"
        />
        <div
        className="mt-10
        max-w-[450px]
        flex
        justify-center
        items-center
        relative
        sm:ml-0
        rounded-2xl
        border-8
        border-slate-400 
        border-opacity-10
        ">
          <Image
            src={Cal}
            alt="Banner"
            className="rounded-2xl"
          />
        </div>
    </section>

    <section className="relative">
        <div
        className="w-full
        blur-[120px]
        rounded-full
        h-32
        absolute
        bg-brand-primaryPurple/50
        -z-100
        top-56
        "/>
        <div
        className="mt-20
        px-4
        sm:px-6 
        flex
        flex-col
        overflow-x-hidden
        overflow-visible
        ">
          <TitleSection
            title="Tested by all"
            subheading="Join thousands of satisfied users who rely on our platform for their 
            personal and professional productivity needs."
            pill="Testimonials"
          />
          {[...Array(2)].map((arr, index) => (
            <div
              key={randomUUID()}
              className={twMerge(
                clsx('mt-10 flex flex-nowrap gap-6 self-start', {
                  'flex-row-reverse': index === 1,
                  'animate-[slide_250s_linear_infinite]': true,
                  'animate-[slide_250s_linear_infinite_reverse]': index === 1,
                  'ml-[100vw]': index === 1,
                }),
                'hover:paused'
              )}
            >
              {USERS.map((testimonial, index) => (
                <CustomCard
                  key={testimonial.name}
                  className="w-[500px]
                  shrink-0s
                  rounded-xl
                  dark:bg-gradient-to-t
                  dark:from-border dark:to-background
                "
                  cardHeader={
                    <div
                      className="flex
                      items-center
                      gap-4
                  "
                    >
                      <Avatar>
                        <AvatarImage src={`/avatars/${index + 1}.png`} />
                        <AvatarFallback>AV</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-foreground">
                          {testimonial.name}
                        </CardTitle>
                        <CardDescription className="dark:text-slate-400">
                          {testimonial.name.toLocaleLowerCase()}
                        </CardDescription>
                      </div>
                    </div>
                  }
                  cardContent={
                    <p className="dark:text-slate-400">
                      {testimonial.message}
                    </p>
                  }
                ></CustomCard>
              ))}
            </div>
          ))}
        </div>
    </section>

    <section
        className="mt-20
        px-4
        sm:px-6
      "
      >
        <TitleSection
          title="The Perfect Plan For You"
          subheading="Experience all the benefits of our platform. Select a plan that suits your needs and take your productivity to new heights."
          pill="Pricing"
        />
        <div
          className="flex 
        flex-col-reverse
        sm:flex-row
        gap-4
        justify-center
        sm:items-stretch
        items-center
        mt-10
        "
        >
          {PRICING_CARDS.map((card) => (
            <CustomCard
              key={card.planType}
              className={clsx(
                'w-[300px] rounded-2xl dark:bg-black/30 background-blur-3xl relative',
                {
                  'border-slate-700':
                    /* The expression `card.planType === PRICING_PLANS.proplan` is checking if the
                    `planType` property of the `card` object is equal to the value stored in
                    `PRICING_PLANS.proplan`. If the condition is true, it will render specific
                    content related to the Pro Plan, such as displaying a diamond icon and setting
                    the plan type as "Pro Plan". This conditional check helps differentiate between
                    different types of pricing plans and customize the display based on the plan
                    type. */
                    card.planType === PRICING_PLANS.proplan,
                }
              )}
              cardHeader={
                <CardTitle
                  className="text-2xl
                  font-semibold
              "
                >
                  {card.planType === PRICING_PLANS.proplan && (
                    <>
                      <div
                        className="hidden dark:block w-full blur-[120px] rounded-full h-32
                        absolute
                        bg-slate-500
                        -z-10
                        top-0
                      "
                      />
                      <Image
                        src={Diamond}
                        alt="Pro Plan Icon"
                        className="absolute top-6 right-6"
                      />
                    </>
                  )}
                  {card.planType}
                </CardTitle>
              }
              cardContent={
                <CardContent className="p-0">
                  <span
                    className="font-normal 
                    text-2xl
                "
                  >
                    Rs.{card.price}
                  </span>
                  {+card.price > 0 ? (
                    <span className="dark:text-slate-400 ml-1">
                      /mo
                    </span>
                  ) : (
                    ''
                  )}
                  <p className="dark:text-slate-400">
                    {card.description}
                  </p>
                  <Button
                    variant="outline"
                    className="whitespace-nowrap w-full mt-4"
                  >
                    {card.planType === PRICING_PLANS.proplan
                      ? 'Go Pro'
                      : 'Get Started'}
                  </Button>
                </CardContent>
              }
              cardFooter={
                <ul
                  className="font-normal
                  flex
                  mb-2
                  flex-col
                  gap-4
                "
                >
                  <small>{card.highlightFeature}</small>
                  {card.freatures.map((feature) => (
                    <li
                      key={feature}
                      className="flex
                      items-center
                      gap-2
                    "
                    >
                      <Image
                        src={CheckIcon}
                        alt="Check Icon"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              }
            />
          ))}
        </div>
    </section>

  </>


   )
 }

 export default HomePage;