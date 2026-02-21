<template>
  <div>
    <UPageHero
      title="Balconity"
      headline="WEB DEVELOPMENT AGENCY"
      description="A place where ideas step outside."
      orientation="horizontal"
      :ui="{ wrapper: 'flex justify-center' }"
    >
      <div class="flex justify-center items-center w-full">
        <app-logo-animated/>
      </div>
    </UPageHero>

    <UPageSection
      title="Why Balconity?"
      description="A balcony gives you fresh air, a clear view, and space to breathe. Balconity gives your business the same — digitally."
      ,
      :features="[{
        icon: 'i-lucide-dot',
        title: 'Fresh Perspective',
        description: 'We step back before we build. Clear strategy and structured thinking replace digital chaos.'
      }, {
        icon: 'i-lucide-dot',
        title: 'Space to Breathe',
        description: 'Clean architecture and maintainable code mean fewer technical headaches and less long-term stress.'
      }, {
        icon: 'i-lucide-dot',
        title: 'A Clear View Forward',
        description: 'Scalable systems and thoughtful planning give you visibility and confidence as your business grows.'
      }, {
        icon: 'i-lucide-dot',
        title: 'Calm, Reliable Execution',
        description: 'No drama. No rushed shortcuts. Just disciplined development and steady delivery.'
      }, {
        icon: 'i-lucide-dot',
        title: 'Built for Stability',
        description: 'Strong foundations create digital environments that feel secure, balanced, and future-ready.'
      }, {
        icon: 'i-lucide-dot',
        title: 'Intentional Simplicity',
        description: 'Every feature has a purpose. We avoid overengineering and focus on solutions that are easy to use, understand, and evolve.'
      }]"
    />

    <UPageSection
      id="features"
      title="Technology stack"
      description="A modern, reliable technology stack focused on performance, scalability, and long-term maintainability. Every tool is carefully chosen to deliver fast, secure, and future-proof web applications."
      :features="[{
        icon: 'i-simple-icons-vuedotjs',
        title: 'Vue',
        description: 'A progressive JavaScript framework used to build fast, interactive, and intuitive user interfaces with a smooth user experience.'
      }, {
        icon: 'i-simple-icons-nuxt',
        title: 'Nuxt',
        description: 'A powerful framework built on top of Vue that enables server-side rendering, excellent SEO, and optimized performance out of the box.'
      }, {
        icon: 'i-simple-icons-prisma',
        title: 'Prisma',
        description: 'A modern database toolkit that ensures clean data access, strong typing, and reliable backend logic for complex applications.'
      }, {
        icon: 'i-simple-icons-mongodb',
        title: 'MongoDB',
        description: 'A flexible and scalable NoSQL database designed to handle growing data needs while maintaining high performance.'
      }, {
        icon: 'i-simple-icons-nodedotjs',
        title: 'NodeJS',
        description: 'A fast and efficient server-side runtime used to build secure APIs, handle business logic, and power modern web applications.'
      }, {
        icon: 'i-simple-icons-shopify',
        title: 'Shopify',
        description: 'A leading e-commerce platform we integrate and build on top of, including headless storefronts powered by the Shopify Storefront API.'
      }]"
    />

    <UPageSection title="Trusted by Businesses">
      <div class="flex flex-col md:flex-row justify-around items-center gap-12 mt-24">
        <img v-if="pickpackLogo" width="200" :src="pickpackLogo" alt="Pickpack"/>
        <img v-if="instateraLogo" width="200" :src="instateraLogo" alt="Instatera"/>
      </div>
    </UPageSection>

    <UPageSection>
      <UPageCTA
        title="Let's create something cool together"
        description="Drop us a message and we'll get back to you quickly. Whether it's a new website, app idea, or just a question, we're excited to hear from you."
        variant="subtle"
        orientation="horizontal"
      >
        <ContactForm/>
      </UPageCTA>
    </UPageSection>
  </div>
</template>

<script setup lang="ts">
import AppLogoWithText from "~/components/AppLogoWithText.vue";

const colorMode = useColorMode()

const pickpackLogo = ref('')
const instateraLogo = ref('')

onMounted(() => {
  watchEffect(() => {
    const isDark = colorMode.value === 'dark' ||
      (colorMode.value === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)

    pickpackLogo.value = isDark
      ? 'https://my.pickpack.hr/public/assets/images/eu-shipments-logo-white.svg'
      : 'https://my.pickpack.hr/public/assets/images/eu-shipments-logo-black.svg'

    instateraLogo.value = isDark
      ? 'https://www.instatera.hr/assets/images/logo.svg'
      : 'https://www.instatera.hr/assets/images/logo.svg'
  })
})
</script>
