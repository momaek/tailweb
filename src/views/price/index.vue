<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="py-4">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-4xl text-center">
        <h2
          class="mt-2 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-200 sm:text-5xl"
        >
          Pricing plans
        </h2>
        <!-- Toggle -->
        <div class="mt-16 flex justify-center">
          <div class="rounded-full border border-slate-300 p-1 dark:border-slate-300/20">
            <div class="flex text-xs font-semibold leading-5">
              <button
                class="w-auto rounded-full bg-blue-600 px-3 py-1 text-slate-200 focus:outline-none"
              >
                Monthly
              </button>
              <button
                class="rounded-full px-3 py-1 text-slate-800 focus:outline-none dark:text-slate-200"
              >
                Yearly
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-4"
      >
        <div
          class="flex flex-col justify-between rounded-3xl bg-slate-50 p-8 text-slate-900 ring-1 ring-slate-300 dark:bg-slate-900 dark:text-slate-200 dark:ring-slate-300/20 lg:mt-8 xl:p-10"
        >
          <div>
            <div class="flex items-center justify-between gap-x-4">
              <h3 id="tier-starter" class="text-lg font-semibold leading-8">Starter</h3>
              <p
                class="rounded-full bg-blue-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-blue-600"
              >
                ✨ Free trial
              </p>
            </div>
            <p class="mt-6 flex items-baseline gap-x-1">
              <span class="text-5xl font-bold tracking-tight">$9.99</span>
              <span class="text-sm font-semibold leading-6 text-slate-700 dark:text-slate-400"
                >/month</span
              >
            </p>
            <ul
              role="list"
              class="mt-8 space-y-3 text-sm leading-6 text-slate-700 dark:text-slate-400"
            >
              <li class="flex gap-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-5 flex-none text-blue-600"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                  <path d="M9 12l2 2l4 -4"></path>
                </svg>
                7-day free trial
              </li>
              <li class="flex gap-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-5 flex-none text-blue-600"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                  <path d="M9 12l2 2l4 -4"></path>
                </svg>
                1,000 tokens per month
              </li>
              <li class="flex gap-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-5 flex-none text-blue-600"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                  <path d="M9 12l2 2l4 -4"></path>
                </svg>
                1 chatbot
              </li>
              <li class="flex gap-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-5 flex-none text-blue-600"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                  <path d="M9 12l2 2l4 -4"></path>
                </svg>
                20 stored chats
              </li>
            </ul>
          </div>
          <a
            href=""
            aria-describedby="tier-starter"
            class="mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 text-blue-600 ring-1 ring-inset ring-blue-600 hover:bg-blue-600 hover:text-blue-50"
            >Buy plan</a
          >
        </div>
        <div
          class="flex flex-col justify-between rounded-3xl bg-slate-50 p-8 text-slate-900 ring-2 ring-blue-600 dark:bg-slate-900 dark:text-slate-200 lg:z-10 xl:p-10"
        >
          <div>
            <div class="flex items-center justify-between gap-x-4">
              <h3 id="tier-startup" class="text-lg font-semibold leading-8">Pro</h3>
              <p
                class="rounded-full bg-blue-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-blue-600"
              >
                🚀 Most popular
              </p>
            </div>
            <p class="mt-6 flex items-baseline gap-x-1">
              <span class="text-5xl font-bold tracking-tight">$19.99</span>
              <span class="text-sm font-semibold leading-6 text-slate-700 dark:text-slate-400"
                >/month</span
              >
            </p>
            <ul
              role="list"
              class="mt-8 space-y-3 text-sm leading-6 text-slate-700 dark:text-slate-400"
            >
              <li class="flex gap-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-5 flex-none text-blue-600"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                  <path d="M9 12l2 2l4 -4"></path>
                </svg>
                5000 tokens per month
              </li>
              <li class="flex gap-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-5 flex-none text-blue-600"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                  <path d="M9 12l2 2l4 -4"></path>
                </svg>
                5 chatbots
              </li>
              <li class="flex gap-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-5 flex-none text-blue-600"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                  <path d="M9 12l2 2l4 -4"></path>
                </svg>
                Unlimited stored chats
              </li>
              <li class="flex gap-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-5 flex-none text-blue-600"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                  <path d="M9 12l2 2l4 -4"></path>
                </svg>
                Integrations
              </li>
              <li class="flex gap-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-5 flex-none text-blue-600"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                  <path d="M9 12l2 2l4 -4"></path>
                </svg>
                Document support
              </li>
            </ul>
          </div>
          <a
            href="#"
            aria-describedby="tier-pro"
            class="mt-8 block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold leading-6 text-blue-50 shadow-sm hover:bg-blue-700"
            >Buy plan</a
          >
        </div>
        <div
          class="flex flex-col justify-between rounded-3xl bg-slate-50 p-8 text-slate-900 ring-1 ring-slate-300 dark:bg-slate-900 dark:text-slate-200 dark:ring-slate-300/20 lg:mt-8 xl:p-10"
        >
          <div>
            <div class="flex items-center justify-between gap-x-4">
              <h3 id="tier-enterprise" class="text-lg font-semibold leading-8">Enterprise</h3>
            </div>
            <p class="mt-6 flex items-baseline gap-x-1">
              <span class="text-5xl font-bold tracking-tight">$29.99</span>
              <span class="text-sm font-semibold leading-6 text-slate-700 dark:text-slate-400"
                >/month</span
              >
            </p>
            <ul
              role="list"
              class="mt-8 space-y-3 text-sm leading-6 text-slate-700 dark:text-slate-400"
            >
              <li class="flex gap-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-5 flex-none text-blue-600"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                  <path d="M9 12l2 2l4 -4"></path>
                </svg>
                20,000 tokens per month
              </li>
              <li class="flex gap-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-5 flex-none text-blue-600"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                  <path d="M9 12l2 2l4 -4"></path>
                </svg>
                Unlimited chatbots
              </li>
              <li class="flex gap-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-5 flex-none text-blue-600"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                  <path d="M9 12l2 2l4 -4"></path>
                </svg>
                Unlimited stored chats
              </li>
              <li class="flex gap-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-5 flex-none text-blue-600"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                  <path d="M9 12l2 2l4 -4"></path>
                </svg>
                Train with websites or documents
              </li>
              <li class="flex gap-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-5 flex-none text-blue-600"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                  <path d="M9 12l2 2l4 -4"></path>
                </svg>
                API access
              </li>
            </ul>
          </div>
          <a
            href="#"
            aria-describedby="tier-enterprise"
            class="mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 text-blue-600 ring-1 ring-inset ring-blue-600 hover:bg-blue-600 hover:text-blue-50"
            >Buy plan</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
