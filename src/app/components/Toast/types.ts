// @import "../../scss/common";
//
// .prizeItem-box {
//   text-align: center;
//
//   .prizeItem-img {
//     width: 106px;
//     height: 107px;
//     margin: auto;
//     position: relative;
//     //background: url("../../../assets/images/common/prize.png");
//     overflow: hidden;
//     border: 2px solid #C78C6E;
//     background: linear-gradient(0deg, #FED09C 0%, #FEE7A2 100%);
//     border-radius: 20px;
//     box-sizing: border-box;
//
//     img {
//       max-width: 110px;
//       max-height: 110px;
//       position: absolute;
//       left: 0;
//       top: 0;
//       right: 0;
//       bottom: 0;
//       margin: auto;
//     }
//
//     .prizeItem-type {
//       @extend .text-one-hidden;
//       text-align: center;
//       font-size: 16px;
//       font-weight: 400;
//       color: #fff;
//       position: absolute;
//       bottom: 0px;
//       left: 0;
//       padding: 0 10px;
//       box-sizing: border-box;
//       width: 100%;
//       height: 23px;
//       background: linear-gradient(90deg, transparent, rgba(72, 35, 20, 0.9), transparent);
//     }
//   }
//
//
//
//   .prizeItem-name {
//     font-size: 20px;
//     font-weight: bold;
//     color: #66340A;
//     padding-top: 3px;
//     line-height: 25px;
//
//     // display: -webkit-box;
//     max-width: 106px;
//     // height: 26px;
//     margin: 0 auto;
//     // -webkit-line-clamp: 1;
//     // -webkit-box-orient: vertical;
//     // overflow: hidden;
//     // text-overflow: ellipsis;
//
//     span {
//       color: #FF9F40;
//     }
//   }
//
//   .prizeItem-det {
//     font-size: 18px;
//     font-weight: bold;
//     color: #66340A;
//     line-height: 23px;
//
//     span {
//       color: #FF9F40;
//     }
//   }
//
// }
//
//
//
//
// //时间
// $tanabataDate-H: 82px;
//
// .tanabataDate-skeleton {
//   width: 663px;
//   margin: auto;
// }
//
// .tanabataDate {
//   border: 1px solid #FFFFFF;
//   background: linear-gradient(0deg, #2A068A 18%);
//   box-shadow: 0px 6px 8px 1px rgba(67, 82, 172, 0.8), 0px -6px 8px 1px rgba(67, 82, 172, 0.79);
//   border-radius: $tanabataDate-H;
//   overflow: hidden;
//   position: relative;
//   z-index: 1;
//   padding: 0 5px;
//
//
//   .tanabataDate-ul {
//     display: flex;
//     padding: 5px 0;
//     box-sizing: border-box;
//     height: $tanabataDate-H;
//     border-radius: $tanabataDate-H;
//     overflow: hidden;
//     -webkit-transform: translate3d(0, 0, 0);
//   }
//
//   .tanabataDate-li {
//     flex: 1;
//     text-align: center;
//     position: relative;
//     border-radius: $tanabataDate-H;
//     border: 1px solid transparent;
//
//     span {
//       @extend .acc;
//
//       display: block;
//       width: 100%;
//     }
//   }
//
//   .tanabataDate-li-action {
//     border: 1px solid #FFEDEF;
//     background: linear-gradient(0deg, #FF687E 17%, #FFAFB6 92%);
//     border-radius: $tanabataDate-H;
//   }
// }
//
//
//
//
// //level
//
// .level-main {
//   overflow: hidden;
//   position: relative;
//   z-index: 1;
//   margin-top: 30px;
//
//   .level-ul {
//     display: flex;
//     height: 43px;
//     align-items: center;
//   }
//
//   .level-li {
//     flex: 1;
//     text-align: center;
//     position: relative;
//
//     span {
//       @extend .acc;
//       display: inline-block;
//       z-index: 2;
//       color: rgba(255, 255, 255, 0.3);
//       width: 90px;
//       height: 40px;
//       line-height: 40px;
//       font-size: 22px;
//       font-weight: bold;
//     }
//
//     &:after {
//       content: '';
//       display: block;
//       width: 18px;
//       height: 13px;
//       position: absolute;
//       right: -9px;
//       top: 50%;
//       transform: translateY(-50%);
//       //background: url("../../../assets/images/common/xgzl_rank_arrow.png");
//       background-size: 100% 100%;
//     }
//
//     &:nth-child(1):before {
//       display: none;
//     }
//
//     &:nth-last-child(1):after {
//       display: none;
//     }
//   }
//
//   .level-li-on {
//     span {
//       color: #fff;
//     }
//   }
//
//   .level-li-action {
//
//     span {
//       color: #fff;
//       //background: url("../../../assets/images/common/xgzl_rank_btn_selected.png");
//       background-size: 100% 100%;
//     }
//   }
// }
//
//
//
// //day
//
// .date-gift-main {
//   overflow: hidden;
//   position: relative;
//   z-index: 1;
//
//   .date-gift-ul {
//     display: flex;
//     height: 44px;
//     width: 100%;
//     margin: 15px auto;
//   }
//
//   .date-gift-li {
//     flex: 1;
//     text-align: center;
//     position: relative;
//
//     span {
//       @extend .acc;
//       display: inline-block;
//       z-index: 2;
//       width: 84px;
//       height: 40px;
//       line-height: 40px;
//       background: #6A2CB6;
//       border-radius: 20px;
//       font-size: 22px;
//       font-weight: bold;
//       color: rgba(255, 255, 255, 0.3);
//
//
//       .check {
//         position: relative;
//         display: inline-block;
//         width: 40px;
//         height: 40px;
//         z-index: 3;
//       }
//
//       .check::after {
//         content: "";
//         position: absolute;
//         left: 50%;
//         top: 0;
//         width: 50%;
//         height: 25%;
//         border: 5px solid #fff;
//         border-radius: 1px;
//         border-top: none;
//         border-right: none;
//         background: transparent;
//         transform: rotate(-45deg) translateX(-50%);
//       }
//     }
//
//     &:after {
//       content: '';
//       display: block;
//       width: 100%;
//       position: absolute;
//       right: 50%;
//       top: 50%;
//       transform: translateY(-50%);
//       height: 8px;
//       background: #6A2CB6;
//     }
//
//     //&:before{
//     //  content: '';
//     //  display: block;
//     //  width: 50%;
//     //  position: absolute;
//     //  left: 0;
//     //  top: 50%;
//     //  height: 1px;
//     //  background: #ccc;
//     //}
//
//     &:nth-child(1):after {
//       display: none;
//     }
//
//     //&:nth-last-child(1):after{
//     //  display: none;
//     //}
//   }
//
//   .date-gift-li-inpast {
//     span {
//       background:url("../../../assets/images/pendant/btn_p.png")no-repeat center center;
//       background-size: 100% 100%;
//       color: #fff;
//       filter: brightness(65%);
//       width: 88px;
//       height: 43px;
//     }
//
//     &:after {
//       background: #985511;
//     }
//   }
//
//
//   .date-gift-li-inpast-no {
//     span {
//       background:url("../../../assets/images/pendant/btn_p.png")no-repeat center center;
//       background-size: 100% 100%;
//       color: rgba(255,255,255,0.4);
//       filter: grayscale(70%);
//       width: 88px;
//       height: 43px;
//     }
//
//     &:after {
//       background: #985511;
//     }
//   }
//
//   .date-gift-today {
//     span {
//       background:url("../../../assets/images/pendant/btn_p.png");
//       background-size: 100% 100%;
//       color: #fff;
//       filter: brightness(60%);
//       width: 88px;
//       height: 43px;
//     }
//     &:after{
//       background: #FFC852;
//     }
//   }
//
//   .date-gift-li-action {
//     span {
//       background:url("../../../assets/images/pendant/btn_p.png");
//       background-size: 100% 100%;
//       color: #fff;
//       width: 88px;
//       height: 43px;
//       filter: none;
//     }
//
//     //&:before{
//     //  background: #FFC852;
//     //}
//     //&:after{
//     //  background: #FFC852;
//     //}
//   }
//
//
//   .date-gift-content {
//     text-align: center;
//     margin-bottom: 20px;
//     // padding-top: 10px;
//
//     .date-gift-content-li {
//       // width: 214px;
//       max-width: 106px;
//       display: inline-block;
//       padding: 0 7px;
//       // height: 302px;
//       //background: url("../../../assets/images/common/beam1.png");
//       background-size: 100% 100%;
//       vertical-align: top;
//       // margin-top: 20px;
//     }
//   }
// }
//
// .grand-dialog-Joy {
//   .date-gift-main {
//     .date-gift-content {
//       .date-gift-content-li {
//         //background: url("../../../assets/images/common/beam2.png");
//         background-size: 100% 100%;
//         width: 214px;
//       }
//     }
//   }
// }
//
//
// .BoxFrame {
//   position: relative;
//   min-height: 600px;
//   height: auto;
//   background: url("../../../assets/images/common/BoxFrame-middle.png");
//   background-size: 100% 100%;
//
//   .BoxFrame-title {
//     @extend .act;
//     width: 552px;
//     height: 99px;
//     background: url("../../../assets/images/common/title.png");
//     background-size: 100% 100%;
//     top: -65px;
//     z-index: 3;
//
//     .BoxFrame-title-c {
//       @extend .fcc;
//       height: 80px;
//       font-size: 35px;
//       font-weight: bold;
//       //font-weight: bold;
//       color: #FBFFFF;
//       text-shadow: 0px 5px 5px rgba(39, 35, 157, 0.84);
//     }
//   }
//
//   &::before {
//     content: '';
//     display: block;
//     background: url("../../../assets/images/common/BoxFrame-title.png") no-repeat;
//     background-size: 100% auto;
//     height: 200px;
//     position: absolute;
//     left: 0;
//     top: -24px;
//     width: 100%;
//   }
//
//   &::after {
//     content: '';
//     display: block;
//     background: url("../../../assets/images/common/BoxFrame-footer.png") no-repeat;
//     background-size: 100% auto;
//     height: 263px;
//     position: absolute;
//     left: 0;
//     bottom: -30px;
//     width: 100%;
//   }
//
//   .BoxFrame-con {
//     position: relative;
//     z-index: 3;
//   }
//
//   &.BoxFrameLong {
//     //background: url("../../../assets/images/common/bonus-header-middle.png") no-repeat 0.01rem -0.04rem;
//     background-size: 100% 96%;
//
//     &:before {
//       height: 610px;
//       //background: url("../../../assets/images/common/bonus-header-top.png") no-repeat;
//       background-size: 100% auto;
//     }
//
//     &:after {
//       height: 139px;
//       //background: url("../../../assets/images/common/bonus-header-bottom.png") no-repeat;
//       background-size: 100% auto;
//     }
//   }
//
// }
//
// .BoxFrame-2 {
//   min-height: 800px;
//   //background: url("../../../assets/images/common/box2-hia.png");
//   background-size: 100% 100%;
//
//   &:before {
//     content: '';
//     display: block;
//     //background: url("../../../assets/images/common/box1-hia.png") no-repeat;
//     background-size: 100% auto;
//     height: 672px;
//     position: absolute;
//     left: 0;
//     top: -30px;
//     width: 100%;
//   }
//
//   &:after {
//     content: '';
//     display: block;
//     //background: url("../../../assets/images/common/box3-hia.png") no-repeat;
//     background-size: 100% auto;
//     height: 139px;
//     position: absolute;
//     left: 0;
//     bottom: -40px;
//     width: 100%;
//     //background-position: -1px 0px;
//   }
// }
//
//
//
// .BoxPop {
//   .ele-dialog-wrap {
//     .ele-dialog-transparent {
//       width: 532px;
//     }
//   }
//
//   .ele-dialog-header {
//     display: none;
//   }
//
//   .ele-dialog-content {
//     border-radius: 0;
//     padding-top: 0;
//     overflow: visible;
//     background-color: transparent;
//     height: auto;
//   }
//
//   .ele-dialog-body {
//     padding: 0;
//     overflow: visible;
//     max-height: none;
//
//   }
//
//   .BoxPop-content {
//     background: url("../../../assets/images/grandCeremonyDialog/dialog_con.png")no-repeat center top;
//     background-size: 100% 100%;
//     height: 427px;
//     position: relative;
//     padding-top: 150px;
//     box-sizing: border-box;
//
//     .BoxPop-content-title {
//       @extend .act;
//       @extend .fcc;
//       height: 70px;
//       width: 100%;
//       //padding: 0 10px;
//       top: 80px;
//       box-sizing: border-box;
//       background: transparent;
//       z-index: 3;
//
//       .BoxPop-content-title-c {
//         //@extend .fcc;
//         font-size: 28px;
//         font-weight: bold;
//         color: #FFE873;
//         flex-wrap: wrap;
//         line-height: 1.2;
//         .BoxPop-content-title-c-0{
//           font-size: 27px;
//         }
//         .BoxPop-content-title-c-1{
//           font-size: 24px;
//         }
//       }
//     }
//   }
//
//   .BoxPop-clone {
//     @extend .fcc;
//     height: 52px;
//     margin-top: 30px;
//     //width: 52px;
//     width: 100%;
//     font-size: 28px;
//     font-weight: 600;
//     color: #FFFFFF;
//     .eleimg-img {
//       background-color: transparent;
//     }
//     img{
//       width: 52px;
//     }
//   }
//
// }
