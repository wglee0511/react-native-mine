# 지뢰 찾기 앱

## 구현사항

- [x] 시작시 게임보드 크기와 지뢰의 수 설정
- [x] 가장 상단 남은 지뢰수와 경과시간 표시
- [x] 지뢰가 있는 셀 터치 시 게임 종료
- [x] 지뢰 없는 셀 터치시 지뢰없는 주변 셀 열기
- [x] 길게 터치시 셀에 플래그를 설치
- [x] 난이도 바텀시트 및 난이도 설정 / 다시하기 / 종료하기
- [x] 게임결과 Alert 표시

## 버전

- Node >= 20 (20.3.0)
- Npm >= 9 (9.6.7)
- Java: 17.0.12

## 설치방법

```javascript
// 패키지 파일 다운로드
npm install
// 설치되지 않는 경우
npm install --legacy-peer-deps
```

## 실행방법

- 아래 방법으로 하나의 서버가 켜지면 w / a / i 로 각각 시행가능

### Web

```javascript
npm run web
```

### Android

```javascript
npm run android
```

### iOS

```javascript
npm run ios

```

#### iOS 실행 에러 발생시

1. code 60 에러

- 시뮬레이터를 완전히 종료
- 다시 실행코드를 기입하여도 실행되지 않을시
- Mac --- > System Settings --- > Storage --- > Developer --- > Delete Xcode Caches

## Reacttoron 사용시

- reacttotron 설치
- app/index.js의 주석해제 (웹은 현재 사용불가)

## 코드스니펫 설정 (선택)

### 설정방법

- 상단 애플로고 옆 Code 클릭 (Mac 기준 VsCode)
- 기본설정 내 사용자 코드 조각 구성 선택
- typescript.json / typescriptreact.json 내 아래 코드를 추가 혹은 설정

```
{
  "mobile-ui text component": {
			"prefix": "mtext",
			"body": [
				"<Text",
				"  fontSize=$1",
				"  fontWeight=$2",
				"  color={COLORS.$3}",
				">",
				"  $4",
				"</Text>"
			]
		},
  "mobile-ui divider component": {
			"prefix": "mdivider",
			"body": [
				"<Divider",
				"  horizontal={$1}",
				"  vertical={$2}",
				"  backgroundColor={$3}",
				"/>",
			]
		},
	"mobile-ui button component": {
			"prefix": "mbutton",
			"body": [
				"<Button",
				"  fontSize={$1}",
				"  fontWeight=$2",
				"  width=$3",
				"  height=$4",
				"  buttonColor={$5}",
				"  onPress={$6}",
				">",
				"  $7",
				"</Button>"
			]
		},
}
```

### 사용법

- 필요한 컴포넌트의 prefix를 입력

```
// ex text component
mtext
```

- 아래와 같이 자동완성 되며 import 하여 사용

```
    <Text
      fontSize=
      fontWeight=
      color={COLORS.}
    >

    </Text>

```
