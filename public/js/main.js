const app = new Vue({
  el: '#app',
  data: {
    currentUser: {},
    currentRoom: 0,
    chatrooms: [],
    socket: null,
    name: '',
    msg: {
      body: '',
    },
    chats: [],
    typingList: [],
    isTyping: '',
  },
  watch: {
    'msg.body': function () {
      this.socket.emit('typing', {
        username: this.currentUser.username,
        currentRoom: this.currentRoom,
      });
    },
  },
  methods: {
    moment: function (date) {
      return moment(date).fromNow();
    },
    addChatroom: function () {
      this.socket.emit('addChatRoom', this.name);

      this.name = '';
    },
    selectChatroom: function (id) {
      const selectedRoom = this.chatrooms.filter((data) => data.id == id)[0];
      this.chats = selectedRoom.chats;
      this.currentRoom = selectedRoom.id;
    },
    sendMsg: function () {
      const chatroomId = this.currentRoom;
      const body = this.msg.body;
      const userId = this.currentUser.id;

      this.socket.emit('addChat', { userId, chatroomId, body });
    },
    isTypingAction: function (data) {
      const name = this.typingList[this.currentRoom];

      if (data && name) {
        return `${name} is typing... .. . .`;
      }
    },
  },
  mounted() {
    axios.get('/chatroom/api').then((resp) => {
      this.chatrooms = resp.data.chatroom;
      this.currentRoom = resp.data.chatroom[0].id;
      this.chats = resp.data.chatroom[0].chats;
    });

    axios.get('/auth').then((resp) => {
      this.currentUser = resp.data.user;
    });
  },
  created() {
    this.socket = io('http://localhost:3000');

    this.socket.on('typingResponse', (data) => {
      this.typingList[data.currentRoom] = data.username;

      this.isTyping = true;

      setTimeout(() => {
        this.isTyping = false;
      }, 1000);
    });

    this.socket.on('addChatRoomClient', (data) => {
      data.chats = [];
      this.chatrooms.push(data);
    });

    this.socket.on('addChatClient', (data) => {
      this.chatrooms.map((chatroom) => {
        if (data.chatroom.id == chatroom.id) {
          const chat = {
            id: data.id,
            body: data.body,
            send_at: data.send_at,
          };

          const user = data.user;

          chatroom.chats.push({
            ...chat,
            user,
          });
        }
      });
    });
  },
});
