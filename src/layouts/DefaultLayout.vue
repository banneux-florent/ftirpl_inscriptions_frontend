<template>
  <div class="container">
    <main>
      <slot />
    </main>
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/addons/kyb/kyb";

* {
  box-sizing: border-box;
}
</style>

<style lang="scss" scoped>
@import "@/assets/scss/fonts/roboto";
@import "@/assets/scss/addons/kyb/colors";

$header-gradient-left-color: #1c78e2;
$header-gradient-right-color: #15388e;
$nav-color: #252525;
$navHeight: 55px;

body {
  color: #202124;
  font-family: Roboto, sans-serif;
  background-color: #ffffff;
}

header {
  .top {
    position: relative;
    height: 200px;
    background: rgb(28,120,226);
    background: -moz-linear-gradient(158deg, $header-gradient-left-color 0%, $header-gradient-right-color 100%);
    background: -webkit-linear-gradient(158deg, $header-gradient-left-color 0%, $header-gradient-right-color 100%);
    background: linear-gradient(158deg, $header-gradient-left-color 0%, $header-gradient-right-color 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#{$header-gradient-left-color}",endColorstr="#{$header-gradient-right-color}",GradientType=1);
    color: white;

    img {
      height: 80px;
      vertical-align: middle;
      margin-right: 0.75rem;
    }

    .title {
      font-weight: 800;
      font-size: 2.25rem;
      align-items: center;

      .text {
        flex-direction: column;

        .big {
          font-size: 1.5em;
        }
      }
    }

    .bottom-shadow {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 60px;
      background: -moz-linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.35) 100%);
      background: -webkit-linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.35) 100%);
      background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.35) 100%);
    }
  }

  nav {
    height: $navHeight;
    background-color: $nav-color;
    color: white;

    .element {
      position: relative;
      height: $navHeight;
      line-height: $navHeight;
      text-decoration: none;
      color: inherit;
      padding: 0 15px;
      transition: 0.15s;
      background-color: $nav-color;

      svg {
        margin-right: 0.25rem;
      }

      &.active {
        background-color: darken($nav-color, 40%);
      }
    }
    a.element {
      .highlight {
        position: absolute;
        bottom: 0;
        height: 5px;
        left: 0;
        right: 0;
        background-color: $header-gradient-left-color;

        &::after {
          content: '';
          display: block;
          margin: 0 auto;
          width: 100%;
          height: 100%;
          background-color: $nav-color;
          transition: 0.15s;
        }
      }

      &.active .highlight::after {
        background-color: darken($nav-color, 40%);
      }

      &:hover {
        background-color: darken($nav-color, 5%);

        .highlight::after {
          background-color: darken($nav-color, 5%);
          height: 0;
        }
      }


      &.logout {
        color: lighten($danger, 5%);


        .highlight {
          background-color: lighten($danger, 5%);
        }
      }
    }
  }
}
</style>
<script setup>
</script>