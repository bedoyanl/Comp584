<template>
    <div className="popupBackground">
        <div className="popupWindow">
            <slot />
        </div>
    </div>
</template>

<style scoped>
.popupWindow {
    max-width: 600px;
    width: 100%;
    border-radius: 10px;
    background-color: white;
    padding: 20px 20px;
    z-index: 1200;
}
    
.popupBackground {
    background-color: rgba(0,0,0,0.4);
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    position: fixed;
 }

</style>