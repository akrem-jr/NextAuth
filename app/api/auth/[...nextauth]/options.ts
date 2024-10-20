import GitHubProviders from "next-auth/providers/github"
import GoogleProviders from "next-auth/providers/google"

export const options = {
    providers: [
        GitHubProviders({
            profile(profile) {
                console.log("github profile ", profile);
                let userRole = "GitHub User ";
                if (profile?.email == "abdulbasetadem@gmail.com") {
                    userRole = "admin"
                }

                return {
                    ...profile,
                    role: userRole,
                };
            },


            clientID: process.env.GITHUB_ID,
            clientSECRET: process.env.GITHUB_SECRET,


        }),

        GoogleProviders({
            profile(profile) {
                console.log("google profile ", profile);


                return {
                    ...profile,
                    id: profile.sub,
                    role: userRole,
                };
            },
            clientID: process.env.GOOGLE_ID,
            clientSECRET: process.env.GOOGLE_SECRET,
        }),


    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) token.role = user.role:
            return token
        },
        async session({ session, token }) {
            if (session?.user) session.user.role = token.role;
            return session;
        },
    },

}