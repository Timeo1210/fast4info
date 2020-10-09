const Among = require('../../models/among.js')

async function createUsersDead(guildId) {
    const usersDead = new Among({
        guildId: guildId
    });
    await usersDead.save()
}

async function removeUsersDeadOfGuild(guildId) {
    const AllUsersDeadOfGuild = await Among.find({
        guildId: guildId
    })
    for (let i in AllUsersDeadOfGuild) {
        await AllUsersDeadOfGuild[i].remove()
    }
}



async function handleCreateGame(guildId) {
    await removeUsersDeadOfGuild(guildId)
    await createUsersDead(guildId)
}

async function handleFinishGame(guildId) {
    await removeUsersDeadOfGuild(guildId)
}

async function addUserToUsersDead(guildId, memberId) {
    const AllUsersDeadOfGuild = await Among.find({
        guildId: guildId
    })
    const UsersDead = AllUsersDeadOfGuild[0]
    //check if id is not in usersDead
    if (UsersDead.usersDead.some((elem) => elem === memberId)) return
    UsersDead.usersDead.push(memberId)
    await UsersDead.save()
}

async function getAllUsersDeadOfGuild(guildId) {
    const AllUsersDeadOfGuild = await Among.find({
        guildId: guildId
    })
    const UsersDead = AllUsersDeadOfGuild[0]
    return UsersDead.usersDead
}

module.exports = {
    handleCreateGame,
    handleFinishGame,
    addUserToUsersDead,
    getAllUsersDeadOfGuild
}