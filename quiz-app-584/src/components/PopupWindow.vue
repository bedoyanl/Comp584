<template>
  <!-- Background div that greys out the content behind the popup window -->
  <div className="popupBackground">
    <!-- Popup window div with a white background and rounded corners -->
    <div className="popupWindow">
      <!-- Slots are a feature of the Vue framework that allow the -->
      <!-- the contents of the popup window to be provided by the  -->
      <!-- popup window's parent component.                        -->
      <slot />
    </div>
  </div>
</template>

<!-- Scoped Styles: These styles only exist within the scope of this file. -->
<style scoped>
.popupWindow {
  max-width: 600px;
  width: 100%;
  border-radius: 10px;
  background-color: white;
  padding: 20px 20px;
  z-index: 1200;
  max-height: 80%;
}

.popupBackground {
  background-color: rgba(0, 0, 0, 0.4);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  position: fixed;
}
</style>