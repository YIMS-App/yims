import { StyleSheet, Text, View } from 'react-native';

const fallsports = [
  {
      sport: 'Soccer',
      points: 11, 
      emoji: "⚽"
  }, 
  {
      sport: 'Flag football',
      points: 6, 
      emoji: "🏈"
  }, 
  {
      sport: 'Spikeball',
      points: 6, 
      emoji: "🦔"
  }, 
  {
      sport: 'Pickeball',
      points: 6, 
      emoji: "🥒"
  }, 
  {
      sport: 'Cornhole',
      points: 6, 
      emoji: "🌽"
  }, 
  {
      sport: 'Ping Pong',
      points: 10, 
      emoji: "🏓"
  }
]

const wintersports = [
  {
      sport: 'Basketball',
      points: 5, 
      emoji: "🏀"
  }, 
  {
      sport: 'Dodgeball',
      points: 8, 
      emoji: "🤾"
  }, 
  {
      sport: 'Indoor Soccer',
      points: 5, 
      emoji: "🥅"
  }, 
  {
      sport: 'Volleyball',
      points: 6, 
      emoji: "🏐"
  }
]

 function EmojiGuide() {
  return (
    <View testID='emoji-guide-view'>
        <Text style={styles.title} testID='emoji-guide-fall'>Fall</Text>
        {
          fallsports.map((item) => <Text key={item.sport} style={[styles.sport, {marginTop: 5}]}>{item["sport"]} {item.emoji} : {item.points} players & points</Text>)
        }
        <Text style={styles.title}>Winter</Text>
        {
          wintersports.map((item) => <Text key={item.sport} style={[styles.sport, {marginTop: 5}]}>{item["sport"]} {item.emoji} : {item.points} players & points</Text>)
        }
        <Text style={styles.title}>Spring</Text>
    </View>
  );
}

export default EmojiGuide;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20, 
    fontWeight: '700',
    color: 'white',
    marginLeft: 25,
    marginRight: 25,
    marginTop: 20,  
    alignSelf: 'center' ,
},
  sport: {
    fontSize: 18, 
    fontWeight: '300',
    color: 'white',
    marginLeft: 25,
    marginRight: 25, 
},
});
