// Copyright (C) 2012-present, The Authors. This program is free software: you can redistribute it and/or  modify it under the terms of the GNU Affero General Public License, version 3, as published by the Free Software Foundation. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details. You should have received a copy of the GNU Affero General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>.

// Do not delete empty comment line below. It's required to mitigate a bug.
// See: https://github.com/box/mojito/issues/588

//

module.exports = {
  "agree": "賛成",
  "disagree": "反対",
  "pass": "わからない/どちらでもない",

  "x_wrote": "から：",
  "x_tweeted": "がツイートしました：",
  "comments_remaining": "残り {{num_comments}} 問",
  "comments_remaining2": "{{num_comments}} が残っています",
  "group_123": "グループ：",
  "comment_123": "意見：",
  "majorityOpinion": "メジャーな意見",
  "majorityOpinionShort": "メジャリティ",
  "info": "インフォ",
  "addPolisToYourSite": "<img style='height: 20px; margin: 0px 4px;' src='{{URL}}'/>",
  "privacy": "プライバシー",
  "TOS": "TOS",
  "writePrompt": "あなたの考え方を共有しよう……",
  "anonPerson": "匿名",
  "helpWhatAmISeeing": "投票傾向が似ている人々がグループ化されます。グループをクリックすると、どの視点を共有しているのかを確認できます。",
  "writeCommentHelpText": "上記の質問に、あなたの意見やアイデアが含まれていない場合、",
  "helpWriteListIntro": "What makes a good statement?",
  "helpWriteListStandalone": "独立したアイデアであること",
  "helpWriteListRaisNew": "新しい視点、経験または問題を提起するものであること",
  "helpWriteListShort": "以上を確認し、下のボックスにできるだけ簡潔に追加してください（280字まで）。",
  "heresHowGroupVoted": "これはグループ {{GROUP_NUMBER}} がどう投票したのか：",
  "one_person": "{{x}} 人",
  "x_people": "{{x}} 人",
  "acrossAllPtpts": "全ての参加者の中に：",
  "xPtptsSawThisComment": " がこの意見を見ました",
  "xOfThoseAgreed": "の参加者が賛成しました",
  "xOfthoseDisagreed": "の参加者が反対しました",
  "opinionGroups": "意見グループ",
  "topComments": "トップ意見",
  "divisiveComments": "別れた意見",
  "pctAgreed": "{{pct}}% が賛成しました",
  "pctDisagreed": "{{pct}}% が反対しました",
  "pctAgreedLong": "{{comment_id}} に投票した {{pct}}% の人が賛成しました。",
  "pctAgreedOfGroup": "グループ {{group}} の {{pct}}% が賛成しました。",
  "pctDisagreedOfGroup": "グループ {{group}} の {{pct}}% が反対しました。",
  "pctDisagreedLong": "{{comment_id}} に投票した {{pct}}% の人が反対しました。",
  "pctAgreedOfGroupLong": "グループ {{group}} で意見 {{comment_id}} に投票した人の {{pct}}% が賛成しました。",
  "pctDisagreedOfGroupLong": "グループ {{group}} で意見 {{comment_id}} に投票した人の {{pct}}% が反対しました。",
  "commentSent": "質問の追加を提案しました。管理者の確認終了後、他のユーザに質問として表示されます。",
  "commentSendFailed": "意見提出にエラーが発生しました。",
  "commentSendFailedEmpty": "意見提出にエラーが発生しました－意見内容を入力してください。",
  "commentSendFailedTooLong": "意見提出にエラーが発生しました－意見内容が長すぎます。",
  "commentSendFailedDuplicate": "意見提出にエラーが発生しました－同じ意見が既にあります。",
  "commentErrorDuplicate": "同じ意見が既にあります。",
  "commentErrorConversationClosed": "この会話は締め切りました。",
  "commentIsEmpty": "意見が空です。",
  "commentIsTooLong": "意見が長すぎます。",
  "hereIsNextStatement": "投票に成功しました。次の意見に行きましょう。",

  "connectFacebook": "Facebookでログイン",
  "connectTwitter": "Twitterでログイン",
  "connectToPostPrompt": "意見するにはメールアドレスまたはFacebookIDでアクセスしてください。あなたのタイムラインには何も表示されません。",
  "connectToVotePrompt": "投票するにはメールアドレスまたはFacebookIDでアクセスしてください。あなたのタイムラインには何も表示されません。",
  "commentWritingTipsHintsHeader": "意見を書くためのコツ",
  "tipCharLimit": "意見は最大で {{char_limit}} 文字です。",
  "tipCommentsRandom": "質問は、管理者の確認後追加され、ランダムに表示されます。",
  "tipOneIdea": "複数のアイデアを含む意見を分けましょう。投票が簡単になります。",
  "tipNoQuestions": "意見は「質問」ではありません。投票者はあなたの意見に賛成するか、反対します。",
  "commentTooLongByChars": "意見は最大で {{CHARACTERS_COUNT}} 文字です。",
  "notSentSinceDemo": "(これはデモンストレーションです)",
  "submitComment": "提出",
  "tipStarred": "重要マークを付ける",
  "participantHelpWelcomeText": "新しい形式の会話へようこそ。他の人の意見に<em>投票</em>してみてください。",
  "participantHelpGroupsText": "意見が似ている人は<span style='font-weight: 700;'>グループにまとめられます。</span>グループをクリックすると、そこの人の視点になれます。<a style='font-weight: 700; cursor: pointer; text-decoration: underline' id='helpTextGroupsExpand'>...more</a>",
  "participantHelpGroupsNotYetText": "7人以上が投票していると、図形が表示されます。",
  "helpWhatAreGroupsDetail": "<p>Amazonの「お勧めの商品」、Netflixの「お勧めの映画」は、統計を使用して、類似のものを購入したり視聴しているユーザをグループ化し、同じグループの他のユーザが購入または視聴しているものを表示します。</p><p>Pol.isでも同様です。グループは以下で確認でき、似たような意見を持つ人々で構成されています。グループをクリックすると、何がそのグループの特徴となっているのかがわかります。</p>",
  "socialConnectPrompt": "ログインしていると、ビジュアルにあなたの位置が表示それます。",
  "connectFbButton": "Facebookでログイン",
  "connectTwButton": "Twitterでログイン",
  "showTranslationButton": "日本語に翻訳する",
  "hideTranslationButton": "元の言語に戻す",
  "thirdPartyTranslationDisclaimer": "翻訳サービスは外部から提供されたものです",

  "notificationsAlreadySubscribed": "この会話を購読しました。",
  "notificationsGetNotified": "新しい質問が追加されたときに通知を受け取る場合、Subscribeボタンを押してください。",
  "notificationsEnterEmail": "メールアドレスを登録すると、新しい意見が有るときに通知を受け取れます。",
  "labelEmail": "メール",
  "notificationsSubscribeButton": "購読",
  "noCommentsYet": "まだ意見はありません。",
  "noCommentsYetSoWrite": "意見を付けて会話を始めましょう。",
  "noCommentsYetSoInvite": "他の人を招待するか、意見を付けて会話を始めましょう。",
  "noCommentsYouVotedOnAll": "ありがとうございます！すべての質問への投票が完了しました。",
  "noCommentsTryWritingOne": "何か言いたいことが有りましたら、意見を書いてみてください。",
  "convIsClosed": "この会話は終了しました。",
  "noMoreVotingAllowed": "投票は締め切りました。",
};