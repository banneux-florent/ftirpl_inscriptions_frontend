<template>
  <main>
    <div id="table">
      <div id="center">
        <slot />
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
#table {
  display: table;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

#center {
  display: table-cell;
  vertical-align: middle;
}
</style>

<style lang="scss">
@import "@/assets/scss/fonts/roboto";

body {
  color: #202124;
  font-family: Roboto, sans-serif;
  line-height: 1.5 !important;
}

* {
  box-sizing: border-box;
}

h3 {
  font-size: 26px;
  font-weight: 400;
  text-align: center;
}

p {
  font-size: 15px;
}

img.logo {
  width: 120px;
  margin: 0 auto;
  display: block;
  margin-bottom: 10px;
}

#box {
  width: 550px;
  margin: 30px auto;
  padding: 48px 40px 36px;
  border: 1px solid #dadce0;
  border-radius: 8px;
}
</style>