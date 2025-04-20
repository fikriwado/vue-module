<template>
  <SidebarProvider :default-open="false">
    <Sidebar />
    <SidebarInset>
      <Header />
      <RouterView />
    </SidebarInset>
  </SidebarProvider>
</template>

<script setup>
import Sidebar from "@/components/global/sidebar/Sidebar.vue";
import Header from "@/components/global/header/Header.vue";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
</script>
