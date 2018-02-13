//DOMが読み込まれたら実行
$(function(){
  /* ----------------------------------------
  下準備
  ---------------------------------------- */
  //enemy及びplayerのHpを100に設定
  var enemyHp = 100;
  var playerHp = 100;

  //一回の攻撃で負うダメージは20ポイント
  var damage = 20;

  //enemyの出し手を入れる変数
  var enemyCard;

  //playerの出し手を入れる変数
  var playerCard;

  //enemyの出し手をランダムに生成する関数
  var enemyWeapon = function(){
    enemyCard = Math.floor( Math.random()*3+1 );
  };

  //enemyの攻撃をパッケージした関数
  var enemyAttack = function(){
    enemyWeapon();

    //display:none;にしていた画像枠を表示
    $('#enemeyIcon').css('display','block');

    //enemyがグーを出した時、変数enemyCardに1を代入
    if(enemyCard === 1){
      $('#enemeyIconImg').attr('src','lib/img/rps/g_reverse.png');
    }
    //enemyがチョキを出した時、変数enemyCardに2を代入
    else if(enemyCard === 2){
      $('#enemeyIconImg').attr('src','lib/img/rps/c_reverse.png');
    }
    //enemyがパーを出した時、変数enemyCardに3を代入
    else if(enemyCard === 3){
      $('#enemeyIconImg').attr('src','lib/img/rps/p_reverse.png');
    }
  };
	
  //gaugeの減少及び背景パワーアップの関数
  var minusHp = function(){
    if(enemyHp === 80){
      $('.enemyGauge').removeClass('w300').addClass('w240');
    }
    else if(enemyHp === 60){
      $('.enemyGauge').removeClass('w240').addClass('w180');
    }
    else if(enemyHp === 40){
      $('.enemyGauge').removeClass('w180').addClass('w120');
    }
    else if(enemyHp === 20){
      $('.enemyGauge').removeClass('w120').addClass('w60p');
    }
    else if(enemyHp === 0){
      $('.enemyGauge').removeClass('w60p').addClass('w0');

      //背景パワーアップ
      window.warp = window.warp==1 ? 0 : 1;
      window.c.clearRect(0, 0, window.canvas.width, window.canvas.height);
      executeFrame();

      $('#judgement').html('&emsp;勝ったぞーー！');
    }
		
    if(playerHp === 80){
      $('.playerGauge').removeClass('w300').addClass('w240');
    }
    else if(playerHp === 60){
      $('.playerGauge').removeClass('w240').addClass('w180');
    }
    else if(playerHp === 40){
      $('.playerGauge').removeClass('w180').addClass('w120');
    }
    else if(playerHp === 20){
      $('.playerGauge').removeClass('w120').addClass('w60p');
    }
    else if(playerHp === 0){
      $('.playerGauge').removeClass('w60p').addClass('w0');

      //背景パワーアップ
      window.warp = window.warp==1 ? 0 : 1;
      window.c.clearRect(0, 0, window.canvas.width, window.canvas.height);
      executeFrame();

      $('#judgement').html('や　ら　れ　た・・・');
    }
  };
	
  //consoleでHp残を確認する関数
  var checkHp = function(){
    console.log('enemyHpは' + enemyHp);
    console.log('playerHpは' + playerHp);
  };

  //consoleで互いの出し手を確認する関数
  var checkCard = function(){
    console.log('enemyCardは' + enemyCard);
    console.log('playerCardは' + playerCard);
  };
  
  //playerの出し手ボタンを有効にする関数
  var okClick = function(){
    $('#iconG,#iconC,#iconP').prop('disabled', false);
  }
  
  //playerの出し手ボタンを無効にしておく関数 → 実行
  var noClick = function(){
    $('#iconG,#iconC,#iconP').prop('disabled', true);
  };
  noClick();
  
  /* ----------------------------------------
  FIGHT!ボタンがクリックされた時のfunction
  ---------------------------------------- */
  $('#start').on('click',function(){

    //playerの出し手ボタンを有効にする
    okClick();
    
    //plyaerとenemyのHpが0だったら100に戻す & ゲージも満たんにする
    if(playerHp === 0 || enemyHp === 0){
      playerHp = 100;
      $('.playerGauge').removeClass('w240,w180,w120,w60p,w0').addClass('w300');
      enemyHp = 100;
      $('.enemyGauge').removeClass('w240,w180,w120,w60p,w0').addClass('w300');
      
      //背景パワーアップ非表示
      window.warp = window.warp==1 ? 0 : 1;
      window.c.clearRect(0, 0, window.canvas.width, window.canvas.height);
      executeFrame();
    }
    
    //enemyの出し手カードを消す
    $('#enemeyIcon').hide();

    //judgementのコメントを消す
    $('#judgement').html('');

    //playerの”selected”クラスを外す
    $('#iconG,#iconC,#iconP').removeClass('selected');
    
    //"damaged"クラスを外す
    $('.enemyGaugeSection,.playerGaugeSection').removeClass('damaged');
    
    //「じゃん」「けん」「ぽん」を一旦非表示
    $('#shout01, #shout02, #shout03').hide();

    //「じゃん」「けん」をフェードインで表示
    setTimeout(function(){
      setTimeout(function(){
        $('#shout01').fadeIn();
      },300);
    },0);
    setTimeout(function(){
      setTimeout(function(){
        $('#shout02').fadeIn();
      },300);
    },500);
    
    //FIGHT!ボタンを非表示する
    $('#start').fadeOut();

  });

  /* ----------------------------------------
  Player
  ---------------------------------------- */
  /*-----------------------------------------
  Playerがグーカードをクリックした時のfunction
  -----------------------------------------*/
  $('#iconG').on('click',function(){

    //「ポン」を表示
    $('#shout03').show();

    //関数enemyAttack実行
    enemyAttack();

    //変数playerCardに1を代入
    playerCard = 1;

    //互いの出し手を確認
    checkCard();

    //#iconGにクラス"selected"を付与
    $('#iconG').addClass('selected');

    //playerの出し手ボタンをボタンを無効に
    noClick();
    
    //FIGHT！ボタンフェードインで表示
    setTimeout(function(){
      setTimeout(function(){
        $('#start').fadeIn();
      },300);
    },1000);

    /*Judgement
    ---------------------------------------*/
    if(playerCard === 1 && enemyCard === 2){
      $('#judgement').html('会心の一撃！<br>敵に20のダメージ！');

      //enemeyのHpを20減らす
      enemyHp -= damage;

      //enemyGaugeSectionをshakeさせる
      $('.enemyGaugeSection').addClass('damaged');
      
      //Hp確認
      checkHp();

      //関数"minusHp"実行
      minusHp();
    }
    else if(playerCard === 1 && enemyCard === 3){
      $('#judgement').html('痛恨の一撃！<br>ダメージ20受ける！');

      //plyaerのHpを20減らす
      playerHp -= damage;

      //playerGaugeSectionをshakeさせる
      $('.playerGaugeSection').addClass('damaged');
      
      //Hp確認
      checkHp();

      //関数"minusHp"実行
      minusHp();
    }
    else if(playerCard === 1 && enemyCard === 1){
      $('#judgement').html('　相打ち！　<br>勝負はこれからだ！');

      //Hp確認
      checkHp();
    }
  });
  
  /*-----------------------------------------
  Playerがチョキカードをクリックした場合
  -----------------------------------------*/
  $('#iconC').on('click',function(){

    //「ポン」を表示
    $('#shout03').show();

    //関数enemyAttack実行
    enemyAttack();

    //変数playerCardに2を代入
    playerCard = 2;

    //互いの出し手を確認
    checkCard();

    //#iconCにクラス"selected"を付与
    $('#iconC').addClass('selected');

    //playerの出し手ボタンをボタンを無効に
    noClick();

    //FIGHT！ボタンフェードインで表示
    setTimeout(function(){
      setTimeout(function(){
        $('#start').fadeIn();
      },300);
    },1000);
    
    /*Judgement
    ---------------------------------------*/
    if(playerCard === 2 && enemyCard === 3){
      $('#judgement').html('会心の一撃！<br>敵に20のダメージ！');

      //enemeyのHpを20減らす
      enemyHp -= damage;

      //enemyGaugeSectionをshakeさせる
      $('.enemyGaugeSection').addClass('damaged');
      
      //Hp確認
      checkHp();

      //関数"minusHp"実行
      minusHp();
    }
    else if(playerCard === 2 && enemyCard === 1){
      $('#judgement').html('痛恨の一撃！<br>ダメージ20受ける！');

      //plyaerのHpを20減らす
      playerHp -= damage;

      //playerGaugeSectionをshakeさせる
      $('.playerGaugeSection').addClass('damaged');
      
      //Hp確認
      checkHp();

      //関数"minusHp"実行
      minusHp();
    }
    else if(playerCard === 2 && enemyCard === 2){
      $('#judgement').html('　相打ち！　<br>勝負はこれからだ！');

      //Hp確認
      checkHp();
    }
  });
  
  /*-----------------------------------------
  Playerがパーカードをクリックした場合
  -----------------------------------------*/
  $('#iconP').on('click',function(){

    //「ポン」を表示
    $('#shout03').show();

    //関数enemyAttack実行
    enemyAttack();

    //変数playerCardに3を代入
    playerCard = 3;

    //互いの出し手を確認
    checkCard();

    //#iconPにクラス"selected"を付与
    $('#iconP').addClass('selected');

    //playerの出し手ボタンをボタンを無効に
    noClick();

    //FIGHT！ボタンフェードインで表示
    setTimeout(function(){
      setTimeout(function(){
        $('#start').fadeIn();
      },300);
    },1000);
    
    /*Judgement
    ---------------------------------------*/
    if(playerCard === 3 && enemyCard === 1){
      $('#judgement').html('会心の一撃！<br>敵に20のダメージ！');

      //enemeyのHpを20減らす
      enemyHp -= damage;

      //enemyGaugeSectionをshakeさせる
      $('.enemyGaugeSection').addClass('damaged');
      
      //Hp確認
      checkHp();

      //関数"minusHp"実行
      minusHp();
    }
    else if(playerCard === 3 && enemyCard === 2){
      $('#judgement').html('痛恨の一撃！<br>ダメージ20受ける！');

      //plyaerのHpを20減らす
      playerHp -= damage;

      //playerGaugeSectionをshakeさせる
      $('.playerGaugeSection').addClass('damaged');
      
      //Hp確認
      checkHp();

      //関数"minusHp"実行
      minusHp();
    }
    else if(playerCard === 3 && enemyCard === 3){
      $('#judgement').html('　相打ち！　<br>勝負はこれからだ！');

      //Hp確認
      checkHp();
    }
  });
  
});

