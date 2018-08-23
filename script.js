'use strict';
const PLAYER_MAX = 8;

const weapons = [
  // シューター
  'ボールドマーカー',
  'ボールドマーカーネオ',
  'わかばシューター',
  'もみじシューター',
  'シャープマーカー',
  'シャープマーカーネオ',
  'プロモデラーMG',
  'プロモデラーRG',
  'スプラシューター',
  'スプラシューターコラボ',
  '.52ガロン',
  '.52ガロンデコ',
  'N-ZAP85',
  'N-ZAP89',
  'プライムシューター',
  'プライムシューターコラボ',
  '.96ガロン',
  '.96ガロンデコ',
  'ジェットスイーパー',
  'ジェットスイーパーカスタム',
  'L3リールガン',
  'L3リールガンD',
  'H3リールガン',
  'H3リールガンD',
  'ボトルガイザー',
  'ボトルガイザーフォイル',
  // ブラスター
  'ノヴァブラスター',
  'ノヴァブラスターネオ',
  'ホットブラスター',
  'ホットブラスターカスタム',
  'ロングブラスター',
  'ロングブラスターカスタム',
  'クラッシュブラスター',
  'クラッシュブラスターネオ',
  'ラピッドブラスター',
  'ラピッドブラスターデコ',
  'Rブラスターエリート',
  'Rブラスターエリートデコ',
  // ローラー・フデ
  'カーボンローラー',
  'カーボンローラーデコ',
  'スプラローラー',
  'スプラローラーコラボ',
  'ダイナモローラー',
  'ダイナモローラーテスラ',
  'ヴァリアブルローラー',
  'ヴァリアブルローラーフォイル',
  'パブロ',
  'パブロ・ヒュー',
  'ホクサイ',
  'ホクサイ・ヒュー',
  // チャージャー
  'スクイックリンα',
  'スクイックリンβ',
  'スプラチャージャー',
  'スプラチャージャーコラボ',
  'スプラスコープ',
  'スプラスコープコラボ',
  'リッター4K',
  'リッター4Kカスタム',
  '4Kスコープ',
  '4Kスコープカスタム',
  '14式竹筒銃・甲',
  '14式竹筒銃・乙',
  'ソイチューバー',
  'ソイチューバーカスタム',
  // スロッシャー
  'バケットスロッシャー',
  'バケットスロッシャーデコ',
  'ヒッセン',
  'ヒッセン・ヒュー',
  'スクリュースロッシャー',
  'スクリュースロッシャーネオ',
  'エクスプロッシャー',
//  'エクスプロッシャーなんちゃら',
  'オーバーフロッシャー',
//  'オーバーフロッシャーなんちゃら',
  // スピナー
  'スプラスピナー',
  'スプラスピナーコラボ',
  'バレルスピナー',
  'バレルスピナーデコ',
  'ハイドラント',
  'ハイドラントカスタム',
  'クーゲルシュライバー',
//  'クーゲルシュライバーなんちゃら',
  'ノーチラス47',
//  'ノーチラス47なんちゃら',
  // マニューバー
  'スパッタリー',
  'スパッタリー・ヒュー',
  'スプラマニューバー',
  'スプラマニューバーコラボ',
  'ケルビン525',
  'ケルビン525デコ',
  'デュアルスイーパー',
  'デュアルスイーパーカスタム',
  'クアッドホッパーブラック',
  'クアッドホッパーホワイト',
  // シェルター
  'パラシェルター',
  'パラシェルターソレーラ',
  'キャンピングシェルター',
  'キャンピングシェルターソレーラ',
  'スパイガジェット',
  'スパイガジェットソレーラ',
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
