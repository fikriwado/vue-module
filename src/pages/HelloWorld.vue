<template>
  <div class="flex justify-center p-15">
    <div class="w-5/12">
      <h1 class="text-center text-xl font-medium mb-4">{{ $t("title") }}</h1>
      <Input />
    </div>
  </div>
</template>

<script setup>
import Input from "@/components/ui/input/Input.vue";
</script>
