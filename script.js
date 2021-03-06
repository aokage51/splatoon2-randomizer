'use strict';
const PLAYER_MAX = 8;

const weapons = [
  // シューター
  'ボールドマーカー',
  'ボールドマーカーネオ',
  'ボールドマーカー7',
  'わかばシューター',
  'もみじシューター',
  'おちばシューター',
  'シャープマーカー',
  'シャープマーカーネオ',
  'プロモデラーMG',
  'プロモデラーRG',
  'プロモデラーPG',
  'スプラシューター',
  'スプラシューターコラボ',
  'スプラシューターベッチュー',
  '.52ガロン',
  '.52ガロンデコ',
  '.52ガロンベッチュー',
  'N-ZAP85',
  'N-ZAP89',
  'N-ZAP83',
  'プライムシューター',
  'プライムシューターコラボ',
  'プライムシューターベッチュー',
  '.96ガロン',
  '.96ガロンデコ',
  'ジェットスイーパー',
  'ジェットスイーパーカスタム',
  'L3リールガン',
  'L3リールガンD',
  'L3リールガンベッチュー',
  'H3リールガン',
  'H3リールガンD',
  'H3リールガンチェリー',
  'ボトルガイザー',
  'ボトルガイザーフォイル',
  // ブラスター
  'ノヴァブラスター',
  'ノヴァブラスターネオ',
  'ノヴァブラスターベッチュー',
  'ホットブラスター',
  'ホットブラスターカスタム',
  'ロングブラスター',
  'ロングブラスターカスタム',
  'ロングブラスターネクロ',
  'クラッシュブラスター',
  'クラッシュブラスターネオ',
  'ラピッドブラスター',
  'ラピッドブラスターデコ',
  'ラピッドブラスターベッチュー',
  'Rブラスターエリート',
  'Rブラスターエリートデコ',
  // ローラー・フデ
  'カーボンローラー',
  'カーボンローラーデコ',
  'スプラローラー',
  'スプラローラーコラボ',
  'スプラローラーベッチュー',
  'ダイナモローラー',
  'ダイナモローラーテスラ',
  'ダイナモローラーベッチュー',
  'ヴァリアブルローラー',
  'ヴァリアブルローラーフォイル',
  'パブロ',
  'パブロ・ヒュー',
  'パーマネント・パブロ',
  'ホクサイ',
  'ホクサイ・ヒュー',
  'ホクサイベッチュー',
  // チャージャー
  'スクイックリンα',
  'スクイックリンβ',
  'スクイックリンγ',
  'スプラチャージャー',
  'スプラチャージャーコラボ',
  'スプラチャージャーベッチュー',
  'スプラスコープ',
  'スプラスコープコラボ',
  'スプラスコープベッチュー',
  'リッター4K',
  'リッター4Kカスタム',
  '4Kスコープ',
  '4Kスコープカスタム',
  '14式竹筒銃・甲',
  '14式竹筒銃・乙',
  '14式竹筒銃・丙',
  'ソイチューバー',
  'ソイチューバーカスタム',
  // スロッシャー
  'バケットスロッシャー',
  'バケットスロッシャーデコ',
  'バケットスロッシャーソーダ',
  'ヒッセン',
  'ヒッセン・ヒュー',
  'スクリュースロッシャー',
  'スクリュースロッシャーネオ',
  'スクリュースロッシャーベッチュー',
  'エクスプロッシャー',
  'エクスプロッシャーカスタム',
  'オーバーフロッシャー',
  'オーバーフロッシャーデコ',
  // スピナー
  'スプラスピナー',
  'スプラスピナーコラボ',
  'スプラスピナーベッチュー',
  'バレルスピナー',
  'バレルスピナーデコ',
  'バレルスピナーリミックス',
  'ハイドラント',
  'ハイドラントカスタム',
  'クーゲルシュライバー',
  'クーゲルシュライバー・ヒュー',
  'ノーチラス47',
  'ノーチラス79',
  // マニューバー
  'スパッタリー',
  'スパッタリー・ヒュー',
  'スパッタリークリア',
  'スプラマニューバー',
  'スプラマニューバーコラボ',
  'スプラマニューバーベッチュー',
  'ケルビン525',
  'ケルビン525デコ',
  'ケルビン525ベッチュー',
  'デュアルスイーパー',
  'デュアルスイーパーカスタム',
  'クアッドホッパーブラック',
  'クアッドホッパーホワイト',
  // シェルター
  'パラシェルター',
  'パラシェルターソレーラ',
  'キャンピングシェルター',
  'キャンピングシェルターソレーラ',
  'キャンピングシェルターカーモ',
  'スパイガジェット',
  'スパイガジェットソレーラ',
  'スパイガジェットベッチュー',
].sort();

const mt = new MersenneTwister();

const getRandomWeapon = 
  () => weapons[Math.round(mt.random() * 10000 * weapons.length) % weapons.length];

const PlayerInfo = {
  getElement: function(){
    return document.getElementById('player-num');
  },
  getNumber: function(){
    return parseInt(this.getElement().textContent) || 1;
  },
  setNumber: function(num){
    this.getElement().textContent = num;
  },
};
  
const decrementPlayer = () => {
  const num = PlayerInfo.getNumber();
  PlayerInfo.setNumber(parseInt(num > 1 ? num-1 : 1));
  modifyFormNum();
};

const incrementPlayer = () => {
  const num = PlayerInfo.getNumber();
  PlayerInfo.setNumber(parseInt(num < PLAYER_MAX ? num+1 : PLAYER_MAX));
  modifyFormNum();
};

const modifyFormNum = () => {
  const num = PlayerInfo.getNumber();
  const parent = document.getElementById('flex-container');
  if(parent.children.length === num)
  {
    return;
  }
  else if(parent.children.length > num)
  {
    parent.removeChild(parent.lastChild);
  }
  else if(parent.children.length < num)
  {
    const clone = parent.firstElementChild.cloneNode(true);
    const leg = clone.getElementsByTagName('legend');
    leg[0].textContent = 'Player' + num;
    const span = clone.getElementsByTagName('span');
    span[0].textContent = '';
    const input = clone.getElementsByTagName('input');
    input[0].value = '';
    parent.appendChild(clone);
  }
};

const executeRandom = () => {
  const parent = document.getElementById('flex-container');
  const length = parent.children.length;
  let nodes = parent.children;
  for(let i = 0; i < length; i++)
  {
    let span = nodes[i].getElementsByTagName('span');
    span[0].textContent = getRandomWeapon();
  }
};

document.addEventListener('DOMContentLoaded', function(){
  document.getElementById('btn-dec').addEventListener('click', decrementPlayer);
  document.getElementById('btn-inc').addEventListener('click', incrementPlayer);
  document.getElementById('btn-exe').addEventListener('click', executeRandom);
});
