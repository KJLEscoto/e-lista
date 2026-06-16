<!-- components/Modal/AddProduct.vue -->
<script setup lang="ts">
const showAddModal = useState('addModal.open', () => false)

const name = ref('')
const price = ref('')
const stock = ref('')
const category = ref('')

const reset = () => {
  name.value = ''
  price.value = ''
  stock.value = ''
  category.value = ''
}

const handleSave = () => {
  // TODO: save logic
  showAddModal.value = false
  reset()
}

watch(showAddModal, (val) => {
  if (!val) reset()
})
</script>

<template>
  <UIModal v-model="showAddModal" title="Add Product" description="Fill in the product details below.">
    <div class="space-y-4">
      <UIInput v-model="name" label="Product Name" placeholder="e.g. Coca-Cola" />
      <UIInput v-model="category" label="Category" placeholder="e.g. Beverages" />
      <div class="grid grid-cols-2 gap-3">
        <UIInput v-model="price" label="Selling Price" type="number" placeholder="0.00" />
        <UIInput v-model="stock" label="Stock" type="number" placeholder="0" />
      </div>
    </div>

    <template #footer>
      <div class="flex gap-3">
        <UIButton variant="ghost" block @click="showAddModal = false">Cancel</UIButton>
        <UIButton block @click="handleSave">Save Product</UIButton>
      </div>
    </template>
  </UIModal>
</template>